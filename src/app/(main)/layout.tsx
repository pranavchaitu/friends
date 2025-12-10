import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
    return <div className="flex">
        <div>
            <Sidebar />
        </div>
        <div>{children}</div>
    </div>
}