"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, Search, IndianRupee, Heart } from "lucide-react";

type Donation = {
    id: string;
    created_at: string;
    donor_name: string;
    donor_email: string;
    donor_phone: string;
    amount: number;
    purpose: string;
    status: string;
};

export default function DonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchDonations() {
            try {
                const { data, error } = await supabase
                    .from('donations')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setDonations(data || []);
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDonations();
    }, []);

    const filteredDonations = donations.filter(d =>
        d.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.donor_phone.includes(searchTerm)
    );

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary size-8" /></div>;

    const totalAmount = filteredDonations.reduce((sum, d) => sum + (d.amount || 0), 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-stone-800 font-serif mb-1">Donations</h1>
                    <p className="text-stone-500">Track and manage temple contributions.</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 pl-4 rounded-xl border border-stone-200 shadow-sm">
                    <div className="text-right pr-4 border-r border-stone-100">
                        <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Total Collection</p>
                        <p className="text-lg font-bold text-green-600">₹ {totalAmount.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 size-4" />
                <input
                    type="text"
                    placeholder="Search by name, phone or purpose..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Donor</th>
                                <th className="px-6 py-4">Purpose</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {filteredDonations.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-stone-400">
                                        No donations found.
                                    </td>
                                </tr>
                            ) : filteredDonations.map((donation) => (
                                <tr key={donation.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-stone-500 text-sm">
                                        {new Date(donation.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-stone-900 font-medium">{donation.donor_name}</div>
                                        <div className="text-xs text-stone-400">{donation.donor_phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium border border-stone-200">
                                            <Heart className="size-3 text-primary" />
                                            {donation.purpose}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-stone-700">
                                        ₹ {donation.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${donation.status === 'success' ? 'bg-green-100 text-green-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {donation.status}
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
