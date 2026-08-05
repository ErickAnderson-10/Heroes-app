import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type React from "react";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  icon: React.JSX.Element; //Es lo mismo que React.ReactNode
  // children: React.ReactNode;  Tambien se puede hacer de esta manera pero ahora lo hice con el extends. Esto te permite poder tener hijos dentro de tus componentes
}

export const HeroStatCard = ({ title, icon, children }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
