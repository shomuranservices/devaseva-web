"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/app/components/ui/Button";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-100 text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="size-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-stone-800 mb-2">Check your email</h1>
                    <p className="text-stone-600 mb-6">
                        We've sent a confirmation link to <span className="font-semibold">{email}</span>. Please click it to verify your account.
                    </p>
                    <Link href="/login">
                        <Button variant="outline" className="w-full">Return to Login</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-stone-800 font-serif mb-2">Create Account</h1>
                    <p className="text-stone-500">Join our community to manage your sevas.</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="••••••••"
                            minLength={6}
                        />
                        <p className="text-xs text-stone-400 mt-1">Must be at least 6 characters.</p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                            <AlertCircle className="size-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                    </Button>
                </form>

                <p className="text-center text-sm text-stone-500 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
