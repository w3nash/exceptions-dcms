import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import { env } from "~/env";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: number;
      username: string;
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    role: number;
    username: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      return {
        ...session,
        ...token,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
          email: user.email,
          username: user.username,
          image: user.image,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("All fields must be provided.");
        }
        return await api.authRouter.loginUser(credentials);
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await api.authRouter.createSession({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }

      return defaultEncode(params);
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
