"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
  const userInitials = user?.name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0]?.toUpperCase())
    .join("") || "U";
  const profilePath = user?.role ? `/accounts/${user.role}` : "/auth/login";

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setIsUserMenuOpen(false);
      router.push("/auth/login");
      router.refresh();
    }
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
                <div ref={userMenuRef} className="relative hidden sm:block">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((open) => !open)}
                    className="flex items-center gap-3 rounded-full border border-border bg-background px-2 py-1.5 transition-colors hover:bg-accent"
                    aria-haspopup="menu"
                    aria-expanded={isUserMenuOpen}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {userInitials}
                    </div>
                    <div className="text-left leading-tight">
                      <p className="text-sm font-medium text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs capitalize text-muted-foreground">
                        {user.role}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        isUserMenuOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-background p-1 shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          router.push(profilePath);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(profilePath)}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    Logout
                  </Button>
                </div>
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
