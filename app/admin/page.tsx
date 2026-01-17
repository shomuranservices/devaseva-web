"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLogin() {
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // SIMULATED AUTH - Replace with Supabase Auth or Server Action later
        // Simple PIN for now: '1234'
        await new Promise((resolve) => setTimeout(resolve, 800)); // Fake network delay

        if (pin === "1234") {
            // Set a simple cookie or local storage flag
            localStorage.setItem("admin_auth", "true");
            document.cookie = "admin_auth=true; path=/";
            router.push("/admin/dashboard");
        } else {
            setError("Invalid PIN. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-100">
                <div className="text-center mb-8">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="size-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-stone-800 font-serif">Admin Access</h1>
                    <p className="text-stone-500">Enter your secure PIN to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Enter PIN"
                            className="w-full text-center text-3xl tracking-widest py-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-300 font-mono"
                            maxLength={4}
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-center text-red-500 text-sm animate-shake">
                            {error}
                        </p>
                    )}

                    <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : "Verify Access"}
                    </Button>
                </form>

                <p className="text-center text-xs text-stone-400 mt-8">
                    Restricted Area. Authorized Personnel Only.
                </p>
            </div>
        </div>
    );
}
