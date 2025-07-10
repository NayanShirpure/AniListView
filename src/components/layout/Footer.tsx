import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AniListView. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">
          Powered by{" "}
          <Link href="https://anilist.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            AniList API
          </Link>
        </p>
      </div>
    </footer>
  );
}
