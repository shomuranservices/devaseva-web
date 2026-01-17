"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
    IndianRupee,
    Users,
    Calendar,
    TrendingUp,
    Loader2
} from "lucide-react";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalDonations: 0,
        pendingBookings: 0,
        upcomingEvents: 0
    });
    const [recentBookings, setRecentBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                // 1. Total Donations
                const { data: donations } = await supabase.from('donations').select('amount');
                const totalAmount = donations?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;

                // 2. Pending Bookings
                const { count: bookingCount } = await supabase
                    .from('bookings')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'pending');

                // 3. Upcoming Events
                const { count: eventCount } = await supabase
                    .from('events')
                    .select('*', { count: 'exact', head: true })
                    .gte('start_time', new Date().toISOString());

                // 4. Recent Bookings (Limit 5)
                const { data: recent } = await supabase
                    .from('bookings')
                    .select('*, sevas(title)')
                    .order('created_at', { ascending: false })
                    .limit(5);

                setStats({
                    totalDonations: totalAmount,
                    pendingBookings: bookingCount || 0,
                    upcomingEvents: eventCount || 0
                });
                setRecentBookings(recent || []);

            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading) {
        return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary size-8" /></div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-stone-800 font-serif">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Donations"
                    value={`₹ ${stats.totalDonations.toLocaleString()}`}
                    icon={<IndianRupee className="text-green-600" />}
                    bg="bg-green-50"
                    trend="+12% this month"
                />
                <StatCard
                    title="Pending Bookings"
                    value={stats.pendingBookings}
                    icon={<Users className="text-blue-600" />}
                    bg="bg-blue-50"
                    trend="Requires attention"
                />
                <StatCard
                    title="Upcoming Events"
                    value={stats.upcomingEvents}
                    icon={<Calendar className="text-purple-600" />}
                    bg="bg-purple-50"
                    trend="Next 30 days"
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-stone-800">Recent Bookings</h3>
                    <button className="text-primary text-sm font-medium hover:underline">View All</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-stone-400 text-xs uppercase tracking-wider border-b border-stone-100">
                            <tr>
                                <th className="pb-3 pl-4">Devotee</th>
                                <th className="pb-3">Seva</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {recentBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-stone-400">No recent bookings found.</td>
                                </tr>
                            ) : recentBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="py-4 pl-4 font-medium text-stone-700">{booking.user_name}</td>
                                    <td className="py-4 text-stone-600">{booking.sevas?.title || 'Unknown Seva'}</td>
                                    <td className="py-4 text-stone-500 text-sm">{new Date(booking.booking_date).toLocaleDateString()}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-stone-100 text-stone-600'
                                            }`}>
                                            {booking.status}
                                        </span>
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

function StatCard({ title, value, icon, bg, trend }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-start justify-between">
            <div>
                <p className="text-stone-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-stone-800 mb-2">{value}</h3>
                <div className="flex items-center gap-1 text-xs text-stone-400">
                    <TrendingUp className="size-3" />
                    <span>{trend}</span>
                </div>
            </div>
            <div className={`p-4 rounded-xl ${bg}`}>
                {icon}
            </div>
        </div>
    )
}
