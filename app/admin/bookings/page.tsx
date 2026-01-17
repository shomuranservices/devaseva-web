"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, Search, CheckCircle, XCircle, Clock } from "lucide-react";

type Booking = {
    id: string;
    created_at: string;
    user_name: string;
    user_phone: string;
    booking_date: string;
    status: string;
    sevas: { title: string; price: number };
};

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchBookings = async () => {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*, sevas(title, price)')
                .order('booking_date', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            // Optimistic update
            setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const filteredBookings = bookings.filter(b =>
        b.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.user_phone.includes(searchTerm) ||
        b.sevas?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary size-8" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-stone-800 font-serif">Bookings Management</h1>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 size-4" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Devotee</th>
                                <th className="px-6 py-4">Seva</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-stone-400">
                                        No bookings found matching your search.
                                    </td>
                                </tr>
                            ) : filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-stone-900 font-medium">
                                            {new Date(booking.booking_date).toLocaleDateString()}
                                        </div>
                                        <div className="text-xs text-stone-400">
                                            Booked: {new Date(booking.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-stone-900 font-medium">{booking.user_name}</div>
                                        <div className="text-sm text-stone-500">{booking.user_phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-stone-900">{booking.sevas?.title || 'Unknown'}</div>
                                        <div className="text-sm text-stone-500">₹ {booking.sevas?.price}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={booking.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'confirmed')}
                                                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Confirm"
                                                    >
                                                        <CheckCircle className="size-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'cancelled')}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <XCircle className="size-5" />
                                                    </button>
                                                </>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'completed')}
                                                    className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors"
                                                >
                                                    Mark Complete
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        confirmed: "bg-blue-100 text-blue-700 border-blue-200",
        completed: "bg-green-100 text-green-700 border-green-200",
        cancelled: "bg-red-100 text-red-700 border-red-200"
    };

    // @ts-ignore
    const style = styles[status] || "bg-stone-100 text-stone-600 border-stone-200";

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${style} capitalize`}>
            {status}
        </span>
    );
}
