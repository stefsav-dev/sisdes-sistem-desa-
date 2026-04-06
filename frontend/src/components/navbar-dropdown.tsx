import React from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";

export function NavbarDropdown() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        Layanan
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem href="/surat" title="Surat Menyurat">
                    Pengajuan surat keterangan
                </ListItem>
                <ListItem href="/pengaduan" title="Pengaduan">
                    Laporkan masalah warga
                </ListItem>
                <ListItem href="/informasi" title="Informasi">
                    Berita dan pengumuman
                </ListItem>
                <ListItem href="/data-warga" title="Data Warga">
                    Database kependudukan
                </ListItem>
            </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

    const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
    >(({ className, title, children, ...props }, ref) => {
    return (
        <li>
        <NavigationMenuLink asChild>
            <a
            ref={ref}
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            {...props}
            >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </p>
            </a>
        </NavigationMenuLink>
        </li>
    );
    });
    ListItem.displayName = "ListItem";