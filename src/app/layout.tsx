import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/app/components/theme-provider";
import { Toaster } from "~/app/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | Smile Factory by Santos Dental Clinic",
    default: "Smile Factory by Santos Dental Clinic",
  },
  description:
    "Welcome to Smile Factory by Santos Dental Clinic. We specialize in providing exceptional dental care and patient satisfaction.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
