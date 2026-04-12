"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}

function SidebarProvider({
  children,
  defaultOpen = true,
}: React.PropsWithChildren<{ defaultOpen?: boolean }>) {
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setOpen(!event.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setOpen((currentOpen) => !currentOpen);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar }}>
      <div className="flex min-h-screen w-full bg-background">{children}</div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-30 bg-black/45 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <aside
        data-open={open}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen w-72 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:sticky lg:top-0 lg:z-10 lg:translate-x-0 lg:transition-[width]",
          open ? "translate-x-0 lg:w-72" : "-translate-x-full lg:w-[88px] lg:translate-x-0",
          className
        )}
      >
        <div className="flex h-full w-full flex-col overflow-hidden">
          {children}
        </div>
      </aside>
    </>
  );
}

function SidebarHeader({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("border-b border-sidebar-border px-4 py-4", className)}>
      {children}
    </div>
  );
}

function SidebarContent({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-3 py-4", className)}>
      {children}
    </div>
  );
}

function SidebarFooter({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("border-t border-sidebar-border px-4 py-4", className)}>
      {children}
    </div>
  );
}

function SidebarInset({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col", className)}>{children}</div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("shrink-0", className)}
      onClick={(event) => {
        toggleSidebar();
        onClick?.(event);
      }}
      {...props}
    >
      <Menu />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}

function SidebarGroup({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

function SidebarGroupLabel({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  const { open } = useSidebar();

  return (
    <p
      className={cn(
        "px-3 text-xs font-semibold tracking-[0.24em] text-sidebar-foreground/60 uppercase transition-opacity duration-200",
        open ? "opacity-100" : "opacity-0 lg:h-0 lg:overflow-hidden lg:px-0",
        className
      )}
    >
      {children}
    </p>
  );
}

function SidebarMenu({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <nav className={cn("space-y-1", className)}>{children}</nav>;
}

function SidebarMenuItem({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn(className)}>{children}</div>;
}

function SidebarMenuButton({
  className,
  isActive = false,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  isActive?: boolean;
}) {
  const { open } = useSidebar();

  return (
    <Button
      variant="ghost"
      className={cn(
        "h-11 w-full justify-start rounded-2xl border border-transparent px-3 text-sidebar-foreground hover:border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive &&
          "border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground",
        !open && "lg:justify-center lg:px-0",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

function SidebarMenuLabel({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  const { open } = useSidebar();

  return (
    <span
      className={cn(
        "truncate transition-opacity duration-200",
        open ? "opacity-100" : "lg:hidden",
        className
      )}
    >
      {children}
    </span>
  );
}

export {
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
};
