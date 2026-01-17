"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, Plus, Calendar, MapPin, Trash2, X } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

type Event = {
    id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
    type: string;
};

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // New Event Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        location: "Temple Premises",
        type: "Festival"
    });

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('start_time', { ascending: false });

            if (error) throw error;
            setEvents(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;

        try {
            const { error } = await supabase.from('events').delete().eq('id', id);
            if (error) throw error;
            setEvents(events.filter(e => e.id !== id));
        } catch (error) {
            alert("Error deleting event");
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('events').insert([formData]);
            if (error) throw error;

            await fetchEvents();
            setIsCreating(false);
            setFormData({ title: "", description: "", start_time: "", end_time: "", location: "Temple Premises", type: "Festival" });
        } catch (error) {
            console.error(error);
            alert("Error creating event");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading && events.length === 0) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary size-8" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-stone-800 font-serif">Events Management</h1>
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                    <Plus className="size-5" /> Add New Event
                </Button>
            </div>

            {/* Create Modal */}
            {isCreating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-stone-800">Add New Event</h2>
                            <button onClick={() => setIsCreating(false)} className="text-stone-400 hover:text-stone-800"><X /></button>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
                                <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="e.g. Navaratri" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Type</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded-lg">
                                    <option>Festival</option>
                                    <option>Pooja</option>
                                    <option>Cultural</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">Start Time</label>
                                    <input required type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-1">End Time</label>
                                    <input required type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                                <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg" rows={3}></textarea>
                            </div>

                            <Button type="submit" className="w-full mt-4" disabled={loading}>
                                {loading ? "Creating..." : "Create Event"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {events.map((event) => (
                    <div key={event.id} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="bg-primary/10 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-primary shrink-0">
                                <span className="text-xs font-bold uppercase">{new Date(event.start_time).toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-xl font-bold">{new Date(event.start_time).getDate()}</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-stone-800">{event.title}</h3>
                                <p className="text-stone-600 text-sm line-clamp-1">{event.description}</p>
                                <div className="flex gap-4 mt-2 text-xs text-stone-400 font-medium">
                                    <span className="flex items-center gap-1"><Calendar className="size-3" /> {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <span className="flex items-center gap-1"><MapPin className="size-3" /> {event.location}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(event.id)}
                            className="self-start md:self-center p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="size-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
