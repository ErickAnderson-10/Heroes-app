import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

interface Breadcrumb {
  label: string;
  to: string;
}

interface Props {
  currentPage: string;
  breadcrumbs: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={<Link to={"/"}>Inicio</Link>}
          ></BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((crumb) => (
          <div className="flex items-center" key={crumb.label}>
            <BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbLink
                render={<Link to={crumb.to}>{crumb.label}</Link>}
              ></BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
