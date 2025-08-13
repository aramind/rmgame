import React, { Fragment } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";

const links: { href: string; title: string }[] = [
  { href: "/play", title: "play" },
  { href: "/history", title: "history" },
  { href: "/about", title: "about" },
];
export default function DesktopNavbar() {
  return (
    <div className="flex justify-between">
      <h1 className="text-5xl font-bold text-teal-800">RM</h1>
      <div>
        {links.map((link, index) => (
          <Link key={index} href={link.href}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
