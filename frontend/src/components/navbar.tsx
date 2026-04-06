"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const session = localStorage.getItem("user");
      if (session) {
        setUser(JSON.parse(session));
      }
    };
    checkAuth();
  }, []);
  
  return { user, isLoading: false };
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navItems = [
    { href: "/", label: "Beranda", roles: ["admin", "superadmin", "warga", null] },
    { href: "/admin", label: "Dashboard Admin", roles: ["admin"] },
    { href: "/superadmin", label: "Dashboard Super Admin", roles: ["superadmin"] },
    { href: "/warga", label: "Dashboard Warga", roles: ["warga"] },
    { href: "/accounts", label: "Manajemen Akun", roles: ["admin", "superadmin"] },
  ];

 
  const userRole = user?.role;
  const filteredNavItems = navItems.filter(
    (item) => item.roles.includes(userRole) || item.roles.includes(null)
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };


  if (isLoading) {
    return (
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
          : "bg-background border-b"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">
              SIDDES Gabahan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {filteredNavItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                          "disabled:pointer-events-none disabled:opacity-50",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side - Auth Section */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {user.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="sm:hidden"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push("/auth/register")}
                  className="hidden sm:inline-flex"
                >
                  Daftar
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col space-y-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Daftar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}