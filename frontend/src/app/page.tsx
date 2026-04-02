"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function NavigationMenuDemo() {
  return (
    <div className="dark min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
          <Link
            href="/"
            className="justify-self-start text-sm font-semibold tracking-wide text-white"
          >
            SISDES
          </Link>
          <NavigationMenu className="hidden md:flex justify-self-center">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                  Getting started
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-white/10 bg-zinc-900/95 text-white shadow-lg">
                  <ul className="w-96 p-2">
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built with Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="Typography">
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden lg:flex">
                <NavigationMenuTrigger className="bg-transparent text-white/90 hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                  Components
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-white/10 bg-zinc-900/95 text-white shadow-lg">
                  <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/docs"
                    className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Docs
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="justify-self-end flex items-center gap-3">
            <Button className="bg-white text-black hover:bg-zinc-200">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button className="bg-white text-black hover:bg-zinc-200">  
              <Link href="/auth/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Navigation bar menggunakan shadcn/ui dengan tombol Login di kanan atas.
        </p>
      </main>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
          <NavigationMenuLink asChild className="text-white/90 hover:bg-white/10 focus:bg-white/10 data-active:bg-white/10">
            <Link href={href}>
              <div className="flex flex-col gap-1 text-sm">
                <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
