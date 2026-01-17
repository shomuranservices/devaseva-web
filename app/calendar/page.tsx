"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Calendar as CalendarIcon, Clock, MapPin, Loader2 } from "lucide-react";

type Event = {
    id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
    type: string;
};

export default function CalendarPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .gte('start_time', new Date().toISOString()) // Only future events
                    .order('start_time', { ascending: true });

                if (error) throw error;
                setEvents(data || []);
            } catch (err) {
                console.error("Error fetching events:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-stone-50">
            <section className="bg-primary py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Temple Calendar</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Join us for upcoming festivals, special poojas, and community events.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="size-10 animate-spin text-primary" />
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-stone-100">
                        <CalendarIcon className="size-16 text-stone-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-stone-600">No Upcoming Events</h3>
                        <p className="text-stone-500">Check back later for updates.</p>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-stone-100 hover:shadow-md transition-all">
                                {/* Date Box */}
                                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-primary/10 text-primary rounded-xl p-4 w-full md:w-32 text-center">
                                    <span className="text-xs font-bold uppercase tracking-widest">{new Date(event.start_time).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-3xl font-bold">{new Date(event.start_time).getDate()}</span>
                                    <span className="text-xs opacity-80">{new Date(event.start_time).toLocaleString('default', { weekday: 'short' })}</span>
                                </div>

                                {/* Event Details */}
                                <div className="flex-grow">
                                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-500 mb-3 border border-stone-200">
                                        {event.type}
                                    </div>
                                    <h2 className="text-2xl font-bold text-stone-800 mb-2 font-serif">{event.title}</h2>
                                    <p className="text-stone-600 mb-4 leading-relaxed">{event.description}</p>

                                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-stone-500 font-medium">
                                        <div className="flex items-center gap-2">
                                            <Clock className="size-4 text-primary" />
                                            <span>
                                                {formatTime(event.start_time)} - {formatTime(event.end_time)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="size-4 text-primary" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
