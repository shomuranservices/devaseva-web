"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Calendar,
    Users,
    IndianRupee,
    LogOut,
    Menu,
    X
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    // Basic Auth Check
    useEffect(() => {
        // Skip check on login page
        if (pathname === "/admin") return;

        const isAuth = localStorage.getItem("admin_auth");
        if (!isAuth) {
            router.push("/admin");
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem("admin_auth");
        document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/admin");
    };

    // If on login page, render without layout
    if (pathname === "/admin") {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-stone-50">
            {/* Mobile Sidebar Toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40 w-64 bg-stone-900 text-stone-300 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}>
                <div className="p-6 border-b border-stone-800">
                    <h2 className="text-2xl font-bold text-white font-serif">DevaSeva<span className="text-primary text-xs ml-1">ADMIN</span></h2>
                </div>

                <nav className="p-4 space-y-2">
                    <NavItem href="/admin/dashboard" icon={<LayoutDashboard />} label="Dashboard" active={pathname === "/admin/dashboard"} />
                    <NavItem href="/admin/bookings" icon={<Users />} label="Bookings" active={pathname === "/admin/bookings"} />
                    <NavItem href="/admin/donations" icon={<IndianRupee />} label="Donations" active={pathname === "/admin/donations"} />
                    <NavItem href="/admin/events" icon={<Calendar />} label="Events" active={pathname === "/admin/events"} />
                </nav>

                <div className="absolute bottom-0 w-full p-6 border-t border-stone-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors w-full"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full md:ml-0">
                <div className="p-8 md:p-12 mt-12 md:mt-0">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${active
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "hover:bg-stone-800 hover:text-white"}
            `}
        >
            <span className="[&>svg]:size-5">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}
