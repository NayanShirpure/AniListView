'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TopAnimeRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams();
        params.set('sort', 'SCORE_DESC');
        router.replace(`/search?${params.toString()}`);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
            <p className="text-muted-foreground">Redirecting to advanced search...</p>
        </div>
    );
}
