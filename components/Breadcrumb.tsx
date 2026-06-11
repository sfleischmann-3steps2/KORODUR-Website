import { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem as BreadcrumbListItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({
  items,
  lang,
}: {
  items: BreadcrumbItem[];
  lang: string;
}) {
  return (
    <BreadcrumbRoot aria-label="Breadcrumb" className="py-4">
      <BreadcrumbList className="gap-1 sm:gap-1 text-[14px]">
        <BreadcrumbListItem>
          <BreadcrumbLink asChild className="text-cyan no-underline hover:text-cyan hover:underline">
            <Link href={`/${lang}`}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbListItem>
        {items.map((item, i) => (
          <Fragment key={i}>
            <BreadcrumbSeparator className="text-navy/40 mx-1">/</BreadcrumbSeparator>
            <BreadcrumbListItem>
              {item.href ? (
                <BreadcrumbLink asChild className="text-cyan no-underline hover:text-cyan hover:underline">
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-navy font-bold">{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbListItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}
