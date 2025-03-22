import logo from "@/assets/Logo.png";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useGetAccountInfo, useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";

const applicationItems = [
  {
    title: "Launchpad",
    description: "The latest industry new and guides curated by our expert team.",
    icon: "📱",
    href: "https://launchpad.teachfi.network",
  },
  {
    title: "DAO",
    description: "Learn how our customers are using Untitled UI to 10x their growth.",
    icon: "⭐",
    href: "https://dao.teachfi.network",
  },
  {
    title: "DEX",
    description: "Get up and running on our newest features and in-depth guides.",
    icon: "▶️",
  },
  {
    title: "NFT Marketplace",
    description: "In-depth articles on our tools and technologies to empower teams.",
    icon: "🎨",
  },
  {
    title: "Educational Platform",
    description: "In-depth articles on our tools and technologies to empower teams.",
    icon: "📚",
  },
];

export const Navbar = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Vision", href: "#vision" },
    { label: "Statistics", href: "#impact" },
    { label: "Partners", href: "#partners" },
    { label: "Team", href: "#team" },
    // { label: "About", href: "#about" },
    { label: "Applications", href: "#applications" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <a href="/" className="flex items-center">
            <img src={logo} alt="TeachFi" />
          </a>
          <div className="flex">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navItems.slice(0, -1).map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={item.href}
                      onClick={(e) => {
                        if (item.href !== "/") {
                          e.preventDefault();
                          scrollToSection(item.href);
                        }
                      }}
                      className="text-sm font-medium transition-colors hover:text-teal-600 text-slate-600 px-4 py-2">
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium bg-transparent text-slate-600">
                    Applications
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[300px] p-3 space-y-3">
                      <div className="space-y-2">
                        {applicationItems.map((item, index) => {
                          return (
                            <div className="flex items-center gap-2" key={index}>
                              <span className="text-xl">{item.icon}</span>
                              <ListItem href={item.href} title={item.title}>
                                {item.description}
                              </ListItem>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="w-0 md:w-20"></div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="sm" variant="outline" className="md:hidden flex ">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {navItems.slice(0, -1).map((item, index) => (
                <DropdownMenuItem key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.href !== "/") {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }
                    }}
                    className="text-sm font-medium transition-colors hover:text-teal-600 text-slate-600 px-4 py-2">
                    {item.label}
                  </a>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-sm font-medium transition-colors hover:text-teal-600 text-slate-600 py-2 pl-6">
                  Applications
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {applicationItems.map((item, index) => {
                      return (
                        <div className="flex items-center gap-2" key={index}>
                          <span className="text-xl">{item.icon}</span>
                          <a
                            target="_blank"
                            href={item.href}
                            rel="noopener noreferrer"
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}>
                            <DropdownMenuItem>{item.title}</DropdownMenuItem>
                          </a>
                          {/* </ListItem> */}
                        </div>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <ul>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </ul>
    );
  }
);
ListItem.displayName = "ListItem";
