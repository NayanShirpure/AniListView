"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Clapperboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/top", label: "Top Anime" },
  { href: "/schedule", label: "Schedule" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 flex items-center h-16">
        <Link href="/" className="flex items-center gap-2 mr-6 flex-shrink-0">
          <Clapperboard className="w-8 h-8 text-primary" />
          <span className="font-headline text-2xl font-bold">AniListView</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <form onSubmit={handleSearch} className="relative w-full max-w-xs ml-4">
          <Input
            type="search"
            name="search"
            placeholder="Search anime..."
            className="pl-10 h-9"
            aria-label="Search anime"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </form>
      </div>
    </header>
  );
}
