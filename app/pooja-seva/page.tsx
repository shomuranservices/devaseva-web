"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/app/components/ui/Button";
import { Loader2, Calendar as CalIcon, CheckCircle2, X } from "lucide-react";

// Types
type Seva = {
    id: string;
    title: string;
    description: string;
    price: number;
    img_url?: string;
};

export default function PoojaSevaPage() {
    const [sevas, setSevas] = useState<Seva[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSeva, setSelectedSeva] = useState<Seva | null>(null);

    // Form State
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        user_name: "",
        user_phone: "",
        user_email: "",
        booking_date: "",
        nakshatra: "",
        gothra: "",
        rashi: "",
    });

    // Fetch Sevas on load
    useEffect(() => {
        async function fetchSevas() {
            try {
                const { data, error } = await supabase.from('sevas').select('*').order('price');
                if (error) throw error;
                setSevas(data || []);
            } catch (err) {
                console.error("Error fetching sevas:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchSevas();
    }, []);

    const handleBookClick = (seva: Seva) => {
        setSelectedSeva(seva);
        setBookingStatus('idle');
    };

    const closeModal = () => {
        setSelectedSeva(null);
        setBookingStatus('idle');
        setFormData({ user_name: "", user_phone: "", user_email: "", booking_date: "", nakshatra: "", gothra: "", rashi: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSeva) return;
        setBookingStatus('submitting');

        try {
            // Get current user if logged in
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;

            const { error } = await supabase.from('bookings').insert([
                {
                    seva_id: selectedSeva.id,
                    ...formData,
                    status: 'pending', // Payment integration pending
                    user_id: user?.id || null
                }
            ]);

            if (error) throw error;
            setBookingStatus('success');
        } catch (err) {
            console.error(err);
            setBookingStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header */}
            <section className="bg-primary py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Pooja & Sevas</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Perform sacred rituals and seek divine blessings.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="size-10 animate-spin text-primary" />
                    </div>
                ) : sevas.length === 0 ? (
                    <div className="text-center py-20 text-stone-500">
                        <p>No Sevas found. Please check database connection.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sevas.map((seva) => (
                            <div key={seva.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                                <div className="h-48 bg-primary/10 flex items-center justify-center">
                                    {/* Placeholder for image if one exists, else icon */}
                                    {seva.img_url ? (
                                        <img src={seva.img_url} alt={seva.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <CalIcon className="size-16 text-primary/30" />
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-stone-800 mb-2 font-serif">{seva.title}</h3>
                                    <p className="text-stone-600 text-sm mb-4 flex-1">{seva.description}</p>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                                        <span className="text-lg font-bold text-primary">₹ {seva.price}</span>
                                        <Button onClick={() => handleBookClick(seva)}>Book Now</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {selectedSeva && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-stone-800 font-serif">Book {selectedSeva.title}</h3>
                            <button onClick={closeModal} className="text-stone-400 hover:text-stone-800">
                                <X className="size-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            {bookingStatus === 'success' ? (
                                <div className="text-center py-10">
                                    <div className="bg-green-100 p-4 rounded-full text-green-600 inline-block mb-4">
                                        <CheckCircle2 className="size-12" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-stone-800 mb-2">Booking Confirmed!</h4>
                                    <p className="text-stone-600 mb-6">
                                        We have received your request for {selectedSeva.title}. <br />
                                        Our team will contact you shortly for payment.
                                    </p>
                                    <Button onClick={closeModal} className="w-full">Close</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="bg-primary/5 p-4 rounded-xl mb-6">
                                        <p className="text-sm text-stone-600">Seva Amount</p>
                                        <p className="text-2xl font-bold text-primary">₹ {selectedSeva.price}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-stone-500 uppercase">Date</label>
                                                <input
                                                    required
                                                    type="date"
                                                    name="booking_date"
                                                    value={formData.booking_date}
                                                    onChange={handleChange}
                                                    className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-stone-500 uppercase">Phone</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    name="user_phone"
                                                    value={formData.user_phone}
                                                    onChange={handleChange}
                                                    placeholder="9876543210"
                                                    className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-stone-500 uppercase">Devotee Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="user_name"
                                                value={formData.user_name}
                                                onChange={handleChange}
                                                className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-stone-500 uppercase">Nakshatra</label>
                                                <input
                                                    type="text"
                                                    name="nakshatra"
                                                    value={formData.nakshatra}
                                                    onChange={handleChange}
                                                    placeholder="Optional"
                                                    className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-semibold text-stone-500 uppercase">Gothra</label>
                                                <input
                                                    type="text"
                                                    name="gothra"
                                                    value={formData.gothra}
                                                    onChange={handleChange}
                                                    placeholder="Optional"
                                                    className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full h-12 text-lg mt-4" disabled={bookingStatus === 'submitting'}>
                                        {bookingStatus === 'submitting' ? (
                                            <>
                                                <Loader2 className="mr-2 size-4 animate-spin" /> Confirming...
                                            </>
                                        ) : "Confirm Booking"}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
