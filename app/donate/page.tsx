"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/app/components/ui/Button";
import Script from "next/script";
import { Heart, Loader2, IndianRupee, ShieldCheck } from "lucide-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function DonatePage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        amount: "",
        purpose: "General Fund",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (orderId: string, amount: number, donationId: number) => {
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: amount * 100,
            currency: "INR",
            name: "DevaSeva",
            description: "Donation for " + formData.purpose,
            order_id: orderId,
            handler: async function (response: any) {
                try {
                    const verifyRes = await fetch("/api/razorpay/verify", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.isAuthentic) {
                        // Update donation status to success
                        const { error: updateError } = await supabase
                            .from("donations")
                            .update({ status: "success", payment_id: response.razorpay_payment_id })
                            .eq("id", donationId);

                        if (updateError) {
                            console.error("Error updating donation status:", updateError);
                            // Even if update fails, payment was successful, so we show success
                        }

                        setSuccess(true);
                        setFormData({ name: "", phone: "", email: "", amount: "", purpose: "General Fund" });
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    alert("Payment verification failed. Please contact support.");
                } finally {
                    setLoading(false);
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone,
            },
            theme: {
                color: "#D97706", // Amber-600 to match theme
            },
            modal: {
                ondismiss: function () {
                    setLoading(false);
                }
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get current user if logged in
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;

            // 1. Create Pending Donation
            const { data: donationData, error: donationError } = await supabase
                .from("donations")
                .insert([
                    {
                        donor_name: formData.name,
                        donor_phone: formData.phone,
                        donor_email: formData.email,
                        amount: parseFloat(formData.amount),
                        purpose: formData.purpose,
                        status: "pending",
                        user_id: user?.id || null
                    },
                ])
                .select()
                .single();

            if (donationError) throw donationError;

            // 2. Create Razorpay Order
            const orderRes = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: parseFloat(formData.amount),
                    currency: "INR",
                }),
            });

            const orderData = await orderRes.json();

            if (orderData.error) {
                throw new Error("Error creating Razorpay order");
            }

            // 3. Initiate Payment
            await handlePayment(orderData.id, parseFloat(formData.amount), donationData.id);

        } catch (error) {
            console.error("Error initiating donation:", error);
            alert("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center min-h-[60vh] justify-center">
                <div className="bg-green-100 p-6 rounded-full text-green-600 mb-6 animate-in zoom-in duration-500">
                    <Heart className="size-12 fill-current" />
                </div>
                <h2 className="text-4xl font-bold text-stone-800 font-serif mb-4">Dhanyavad!</h2>
                <p className="text-xl text-stone-600 max-w-lg mb-8">
                    Your contribution has been successfully received. <br />
                    May the blessings of the Divine be with you.
                </p>
                <Button onClick={() => setSuccess(false)} size="lg">
                    Make Another Donation
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-stone-50">
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <section className="bg-primary py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Make a Contribution</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Support Annadanam, Temple Construction, and Daily Poojas.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-100">
                    <div className="flex items-center gap-3 mb-8 text-primary bg-primary/5 p-4 rounded-xl border border-primary/10">
                        <ShieldCheck className="size-6" />
                        <p className="text-sm font-medium">Your donation helps sustain our spiritual heritage.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-stone-700">Donation Purpose</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['General Fund', 'Annadanam', 'Construction', 'Pooja'].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, purpose: p })}
                                        className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${formData.purpose === p
                                            ? "bg-primary text-white border-primary shadow-md transform scale-105"
                                            : "bg-white text-stone-600 border-stone-200 hover:border-primary/50 hover:bg-stone-50"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-stone-700">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-stone-700">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700">Email Address (Optional)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="devotee@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700">Donation Amount (₹)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                                    <IndianRupee className="size-5" />
                                </div>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="1001"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 text-stone-900 text-xl font-bold placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full text-lg h-14 mt-4 shadow-xl shadow-primary/20"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Proceed to Donate"
                            )}
                        </Button>

                        <p className="text-center text-xs text-stone-400 pt-4">
                            Secure payments powered by Razorpay.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
