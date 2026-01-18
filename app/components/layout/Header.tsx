"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/app/components/ui/Button";
import { Menu, User, LogOut } from "lucide-react";

export function Header() {
    const [user, setUser] = useState<any>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <LogOut className="size-5 rotate-180" /> : <Menu className="size-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-stone-200 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-4">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-stone-50 rounded-lg text-sm font-medium text-stone-700">
                        Home
                    </Link>
                    <Link href="/pooja-seva" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-stone-50 rounded-lg text-sm font-medium text-stone-700">
                        Pooja & Sevas
                    </Link>
                    <Link href="/calendar" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-stone-50 rounded-lg text-sm font-medium text-stone-700">
                        Calendar & Events
                    </Link>
                    <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-stone-50 rounded-lg text-sm font-medium text-stone-700">
                        Online Donations
                    </Link>
                    <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-stone-50 rounded-lg text-sm font-medium text-stone-700">
                        Gallery
                    </Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-stone-50 rounded-lg text-sm font-medium text-stone-700">
                        About Us
                    </Link>
                    <div className="h-px bg-stone-100 my-2" />
                    {user ? (
                        <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-stone-50 rounded-lg text-sm font-medium text-primary flex items-center gap-2">
                            <User className="size-4" />
                            My Profile
                        </Link>
                    ) : (
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="p-3 hover:bg-stone-50 rounded-lg text-sm font-medium text-primary flex items-center gap-2">
                            <User className="size-4" />
                            Sign In
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
