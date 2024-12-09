import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default async function AppBreadcrumb({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-2">
            <img src="/favicon-32x32.png" alt="Smile Factory logo" />
            Smile Factory
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {children}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
