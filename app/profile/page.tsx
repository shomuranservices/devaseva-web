"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/app/components/ui/Button";
import { Loader2, LogOut, Ticket, Heart, User, Calendar } from "lucide-react";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [donations, setDonations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'bookings' | 'donations'>('bookings');
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
                return;
            }
            setUser(session.user);
            fetchUserData(session.user.id);
        };

        checkUser();
    }, [router]);

    const fetchUserData = async (userId: string) => {
        try {
            // Fetch Bookings
            const { data: myBookings } = await supabase
                .from('bookings')
                .select('*, sevas(title, price, img_url)')
                .eq('user_id', userId)
                .order('booking_date', { ascending: false });

            // Fetch Donations
            const { data: myDonations } = await supabase
                .from('donations')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            setBookings(myBookings || []);
            setDonations(myDonations || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <Loader2 className="animate-spin size-8 text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Profile Header */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center text-primary">
                            <User className="size-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-stone-800">{user?.email?.split('@')[0]}</h1>
                            <p className="text-stone-500">{user?.email}</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
                        <LogOut className="size-4 mr-2" />
                        Sign Out
                    </Button>
                </div>

                {/* Dashboard Tabs */}
                <div className="flex gap-4 mb-6 border-b border-stone-200">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'bookings' ? 'text-primary' : 'text-stone-500 hover:text-stone-800'
                            }`}
                    >
                        My Bookings
                        {activeTab === 'bookings' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('donations')}
                        className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'donations' ? 'text-primary' : 'text-stone-500 hover:text-stone-800'
                            }`}
                    >
                        My Donations
                        {activeTab === 'donations' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                    </button>
                </div>

                {/* Content Area */}
                {activeTab === 'bookings' && (
                    <div className="space-y-4">
                        {bookings.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-3xl border border-stone-100">
                                <Ticket className="size-12 text-stone-200 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-stone-600">No Bookings Yet</h3>
                                <p className="text-stone-500 mb-6">Explore our sevas and book a pooja.</p>
                                <Button onClick={() => router.push('/pooja-seva')}>Browse Sevas</Button>
                            </div>
                        ) : (
                            bookings.map((booking) => (
                                <div key={booking.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className="bg-primary/5 p-4 rounded-xl shrink-0 h-fit">
                                            <Calendar className="size-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-stone-800 mb-1">{booking.sevas?.title || 'Unknown Seva'}</h3>
                                            <div className="flex flex-wrap gap-2 text-sm text-stone-500">
                                                <span>{new Date(booking.booking_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                <span>•</span>
                                                <span>{booking.status}</span>
                                            </div>
                                            {(booking.nakshatra || booking.gothra) && (
                                                <div className="mt-2 text-xs text-stone-500 bg-stone-50 inline-block px-2 py-1 rounded-lg">
                                                    {booking.nakshatra} {booking.gothra ? `| ${booking.gothra}` : ''}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-stone-800">₹ {booking.sevas?.price}</span>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-2 capitalize ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'donations' && (
                    <div className="space-y-4">
                        {donations.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-3xl border border-stone-100">
                                <Heart className="size-12 text-stone-200 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-stone-600">No Donations Yet</h3>
                                <p className="text-stone-500 mb-6">Support the temple activities.</p>
                                <Button onClick={() => router.push('/donate')}>Donate Now</Button>
                            </div>
                        ) : (
                            donations.map((donation) => (
                                <div key={donation.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-green-50 p-4 rounded-xl">
                                            <Heart className="size-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-stone-800">{donation.purpose}</h3>
                                            <p className="text-sm text-stone-500">{new Date(donation.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-green-700">+ ₹ {donation.amount.toLocaleString()}</span>
                                        <span className="text-xs text-stone-400 capitalize">{donation.status}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
