
'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Menu, X } from 'lucide-react';
import { WhatsappFAB } from '@/components/whatsapp-fab';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us', shortLabel: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-8">
          <div className="mr-4 flex items-center">
             <Link href="/" className="mr-6 flex items-center space-x-2">
                <Logo className="h-7 w-7 animate-spin-slow text-primary" />
                <span className="font-bold sm:inline-block">AutoPilot Garage</span>
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
                 <Link
                  key={link.href}
                  href={link.href}
                  className={cn("transition-colors hover:text-foreground/80", pathname === link.href ? "text-foreground" : "text-foreground/60")}
                >
                  {link.href === '/about' ? (
                    <>
                      <span className="md:hidden lg:inline">{link.label}</span>
                      <span className="hidden md:inline lg:hidden">{link.shortLabel}</span>
                    </>
                  ) : (
                    link.label
                  )}
                </Link>
            ))}
          </nav>
          
          <div className="flex flex-1 items-center justify-end md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          <div className="hidden items-center justify-end space-x-2 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/booking">Book a Service</Link>
            </Button>
          </div>

        </div>
        {isMenuOpen && (
            <div className="md:hidden">
                <div className="container px-4 sm:px-8 pb-4 flex flex-col space-y-2">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn("text-lg py-2 transition-colors hover:text-foreground/80", pathname === link.href ? "text-foreground font-semibold" : "text-foreground/60")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                     <div className="flex flex-col space-y-2 pt-4">
                        <Button variant="ghost" asChild className="flex-1">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="flex-1">
                          <Link href="/booking">Book a Service</Link>
                        </Button>
                    </div>
                </div>
            </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/40 relative overflow-hidden">
        <div className="container relative z-10 py-12 px-4 sm:px-8">
            <div className="hidden md:block absolute -bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3">
                <span 
                  className="text-[12rem] font-black text-muted-foreground/10" 
                  style={{
                      WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                  }}
                >
                    AutoPilot
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                     <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Logo className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">
                            AutoPilot Garage
                        </span>
                    </Link>
                    <p className="mt-4 text-muted-foreground text-sm">Smarter Car Care, Driven by Technology.</p>
                     <div className="mt-6 flex space-x-4">
                        <Link href="#"><Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                        <Link href="#"><Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                        <Link href="#"><Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                        <Link href="#"><Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" /></Link>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                    <ul className="space-y-3">
                        <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
                        <li><Link href="/booking" className="text-sm text-muted-foreground hover:text-primary transition-colors">Booking</Link></li>
                        <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-lg mb-4">Legal</h4>
                    <ul className="space-y-3">
                        <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
                     <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>123 Ngong Road, Nairobi</li>
                        <li>+254 712 345 678</li>
                        <li>hello@autopilot.co.ke</li>
                    </ul>
                </div>

            </div>
             <div className="mt-12 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} AutoPilot Garage. All rights reserved.</p>
            </div>
        </div>
        <WhatsappFAB />
      </footer>
    </div>
  );
}
