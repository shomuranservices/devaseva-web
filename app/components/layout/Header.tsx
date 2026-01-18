"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/app/components/ui/Button";
import { Menu, User, LogOut } from "lucide-react";

export function Header() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // optionally router.refresh() or redirect
    };

    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        D
                    </div>
                    <span className="text-xl font-bold tracking-tight text-primary">
                        DevaSeva
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 xl:gap-8">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/pooja-seva" className="text-sm font-medium hover:text-primary transition-colors">
                        Pooja & Sevas
                    </Link>
                    <Link href="/calendar" className="text-sm font-medium hover:text-primary transition-colors">
                        Calendar & Events
                    </Link>
                    <Link href="/donate" className="text-sm font-medium hover:text-primary transition-colors">
                        Online Donations
                    </Link>
                    <Link href="/gallery" className="text-sm font-medium hover:text-primary transition-colors">
                        Gallery
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                        About Us
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link href="/profile">
                                <Button variant="outline" size="sm" className="hidden md:inline-flex gap-2">
                                    <User className="size-4" />
                                    Profile
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="default" size="sm" className="hidden md:inline-flex gap-2">
                                <User className="size-4" />
                                Sign In
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="size-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
