import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Icons (gunakan lucide-react)
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Send,
} from "lucide-react";

const currentYear = new Date().getFullYear();

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Tentang",
    links: [
      { label: "Profil Desa", href: "/tentang/profil" },
      { label: "Visi & Misi", href: "/tentang/visi-misi" },
      { label: "Struktur Organisasi", href: "/tentang/struktur" },
      { label: "Sejarah", href: "/tentang/sejarah" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Surat Menyurat", href: "/layanan/surat" },
      { label: "Pengaduan Masyarakat", href: "/layanan/pengaduan" },
      { label: "Informasi Publik", href: "/layanan/informasi" },
      { label: "Data Kependudukan", href: "/layanan/data-warga" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Berita", href: "/informasi/berita" },
      { label: "Pengumuman", href: "/informasi/pengumuman" },
      { label: "Agenda", href: "/informasi/agenda" },
      { label: "Galeri", href: "/informasi/galeri" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "/bantuan/faq" },
      { label: "Kontak Kami", href: "/bantuan/kontak" },
      { label: "Syarat & Ketentuan", href: "/bantuan/syarat" },
      { label: "Kebijakan Privasi", href: "/bantuan/privacy" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
];

const contactInfo = [
  { icon: MapPin, text: "Jl. Desa Gabahan No. 123, Kec. Simo, Kab. Boyolali", href: "https://maps.google.com" },
  { icon: Phone, text: "(0274) 1234567", href: "tel:02741234567" },
  { icon: Mail, text: "info@desagabahan.id", href: "mailto:info@desagabahan.id" },
  { icon: Clock, text: "Senin - Jumat: 08.00 - 15.00 WIB", href: undefined },
];

export function Footer() {
  return (
    <footer className="bg-background border-t mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">SG</span>
                </div>
                <span className="font-bold text-lg">SIDDES Gabahan</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Sistem Informasi Desa Gabahan memberikan kemudahan akses layanan 
                administrasi dan informasi bagi warga desa secara digital.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Ikuti Kami</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-muted-foreground hover:text-primary transition-colors",
                        "inline-flex items-center group"
                      )}
                    >
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-3">
                <info.icon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {info.text}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">{info.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
            <p>
              &copy; {currentYear} SIDDES Gabahan. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/bantuan/syarat" className="hover:text-primary transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="/bantuan/privacy" className="hover:text-primary transition-colors">
                Privasi
              </Link>
              <Link href="/bantuan/sitemap" className="hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}