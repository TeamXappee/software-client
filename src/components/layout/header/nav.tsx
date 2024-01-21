import { NavLink } from "@/components/shared/navlink";
import { LayoutGrid,  UploadCloud, UserSearch } from "lucide-react";
import React from "react";

export default function Nav() {
  return (
    <nav>
      <ul className="flex gap-4 items-center">
        <NavLink href="/">
          <LayoutGrid size={17} /> Home
        </NavLink>
        <NavLink href="/upload">
          <UploadCloud size={17} /> Upload
        </NavLink>
        <NavLink href="/clients">
          <UserSearch size={17} /> Clients
        </NavLink>
      </ul>
    </nav>
  );
}

