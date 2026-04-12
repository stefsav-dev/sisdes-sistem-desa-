"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  FileClock,
  Home,
  LogOut,
  PanelLeftClose,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_URL } from "@/lib/api";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuLabel,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

type DashboardStat = {
  label: string;
  value: string;
  description: string;
};

type DashboardActivity = {
  title: string;
  description: string;
  time: string;
};

type DashboardQuickAction = {
  title: string;
  description: string;
};

type DashboardShellProps = {
  role: "admin" | "superadmin";
  title: string;
  subtitle: string;
  stats: DashboardStat[];
  activities: DashboardActivity[];
  quickActions: DashboardQuickAction[];
};

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

const dashboardNav: Record<DashboardShellProps["role"], NavItem[]> = {
  admin: [
    { title: "Dashboard", href: "/accounts/admin", icon: Home },
    { title: "Data Penduduk Dusun", href: "/accounts/admin/penduduk", icon: Users },
    { title: "Data Ronda Dusun", href: "/accounts/admin/ronda", icon: Activity },
    { title: "Kelola Berita Dusun", href: "/accounts/admin/berita_dusun", icon: FileClock },
    { title: "Superadmin", href: "/accounts/superadmin", icon: ShieldCheck },
  ],
  superadmin: [
    { title: "Dashboard", href: "/accounts/superadmin", icon: Home },
    { title: "Monitoring", href: "/accounts/superadmin#aktivitas", icon: BarChart3 },
    { title: "Kelola Admin", href: "/accounts/superadmin#layanan", icon: Users },
    { title: "Admin", href: "/accounts/admin", icon: ShieldCheck },
  ],
};

function DashboardSidebar({
  role,
  title,
}: Pick<DashboardShellProps, "role" | "title">) {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <PanelLeftClose className="size-5" />
          </div>
          <div className={open ? "min-w-0 lg:block" : "hidden lg:hidden"}>
            <p className="text-xs font-medium tracking-[0.28em] text-sidebar-foreground/60 uppercase">
              SIDDES
            </p>
            <h2 className="truncate text-lg font-semibold">{title}</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigasi</SidebarGroupLabel>
          <SidebarMenu>
            {dashboardNav[role].map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.href}>
                      <Icon className="size-4" />
                      <SidebarMenuLabel>{item.title}</SidebarMenuLabel>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent p-3 text-sm text-sidebar-accent-foreground">
          <p className={open ? "font-semibold" : "hidden lg:hidden"}>Panel aktif</p>
          <p className={open ? "mt-1 text-sidebar-accent-foreground/75" : "hidden lg:hidden"}>
            {role === "admin"
              ? "Kelola layanan warga dan pantau progres harian."
              : "Awasi seluruh operasional dan performa admin desa."}
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function DashboardUserMenu({ role }: Pick<DashboardShellProps, "role">) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const profilePath = `/accounts/${role}`;
  const accountName =
    user?.name ?? (role === "admin" ? "Admin Desa Gabahan" : "Superadmin SIDDES");
  const accountRole = user?.role ?? role;
  const initials =
    accountName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

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
      logout();
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      setOpen(false);
      router.push("/auth/login");
      router.refresh();
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5 text-left shadow-sm transition-colors hover:bg-muted/60 sm:w-auto"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{accountName}</p>
          <p className="text-xs capitalize text-muted-foreground">{accountRole}</p>
        </div>
        <ChevronDown
          className={open ? "size-4 shrink-0 rotate-180 text-muted-foreground transition-transform" : "size-4 shrink-0 text-muted-foreground transition-transform"}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-52 rounded-2xl border border-border bg-background p-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              router.push(profilePath);
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-accent"
          >
            <User className="size-4" />
            Profile
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export function DashboardShell({
  role,
  title,
  subtitle,
  stats,
  activities,
  quickActions,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} title={title} />
      <SidebarInset className="bg-muted/30">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 px-4 py-4 backdrop-blur md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <SidebarTrigger />
                <div>
                  <p className="text-sm font-medium tracking-[0.22em] text-muted-foreground uppercase">
                    Dashboard {role}
                  </p>
                  <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                    {subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <DashboardUserMenu role={role} />
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="border-border/70 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardDescription>{stat.label}</CardDescription>
                    <CardTitle className="text-3xl">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              <Card id="aktivitas" className="border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle>Aktivitas terbaru</CardTitle>
                  <CardDescription>
                    Ringkasan pekerjaan dan pembaruan yang perlu dipantau hari ini.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={`${activity.title}-${activity.time}`}
                      className="flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-muted/40 p-4"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-medium text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card id="layanan" className="border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle>Aksi cepat</CardTitle>
                  <CardDescription>
                    Shortcut untuk pekerjaan yang paling sering dipakai tim.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action) => (
                    <div
                      key={action.title}
                      className="rounded-2xl border border-border/70 bg-background p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">{action.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                        <ArrowUpRight className="mt-0.5 size-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
