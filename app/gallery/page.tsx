"use client";

import { useState } from "react";
import { X, ZoomIn, PlayCircle } from "lucide-react";

// Types
type GalleryItem = {
    type: 'image' | 'video';
    src: string; // Image source or Thumbnail for video
    alt: string;
    category: string;
    videoId?: string; // Only for videos
};

const galleryItems: GalleryItem[] = [
    // Images
    { type: 'image', src: "/gallery/Temple/temple-overview.jpg", alt: "Temple Overview", category: "Temple" },
    { type: 'image', src: "/temple-deity.jpg", alt: "Sri Jaladurgaparameshwari", category: "Deity" },
    { type: 'image', src: "/history-1.jpg", alt: "Temple History", category: "History" },
    { type: 'image', src: "/history-2.jpg", alt: "Temple History", category: "History" },
    { type: 'image', src: "/history-3.jpg", alt: "Temple History", category: "History" },
    { type: 'image', src: "/history-4.jpg", alt: "Temple History", category: "History" },
    { type: 'image', src: "/history-5.jpg", alt: "Temple History", category: "History" },
    { type: 'image', src: "/history-6.jpg", alt: "Temple History", category: "History" },
    { type: 'image', src: "/history-7.jpg", alt: "Temple History", category: "History" },
    { type: 'image', src: "/agastya.jpg", alt: "Maharshi Agastya", category: "Deity" },

    // Videos (History Video)
    { type: 'video', src: "https://img.youtube.com/vi/z0j3vwdvE94/maxresdefault.jpg", alt: "History Video 1", category: "History Video", videoId: "z0j3vwdvE94" },
    { type: 'video', src: "https://img.youtube.com/vi/Ggmf96GiuZ8/maxresdefault.jpg", alt: "History Video 2", category: "History Video", videoId: "Ggmf96GiuZ8" },
    { type: 'video', src: "https://img.youtube.com/vi/y7wxL_EMjQg/maxresdefault.jpg", alt: "History Video 3", category: "History Video", videoId: "y7wxL_EMjQg" },
    { type: 'video', src: "https://img.youtube.com/vi/GAlgsq2nuaw/maxresdefault.jpg", alt: "History Video 4", category: "History Video", videoId: "GAlgsq2nuaw" },
    { type: 'video', src: "https://img.youtube.com/vi/kj8xa3PETV4/maxresdefault.jpg", alt: "History Video 5", category: "History Video", videoId: "kj8xa3PETV4" },
    { type: 'video', src: "https://img.youtube.com/vi/3zz5a6hmbig/maxresdefault.jpg", alt: "History Video 6", category: "History Video", videoId: "3zz5a6hmbig" },
    { type: 'video', src: "https://img.youtube.com/vi/IhC6sTgtZCs/maxresdefault.jpg", alt: "History Video 7", category: "History Video", videoId: "IhC6sTgtZCs" },
    { type: 'video', src: "https://img.youtube.com/vi/H47li4jhiHE/maxresdefault.jpg", alt: "History Video 8", category: "History Video", videoId: "H47li4jhiHE" },
];

export default function GalleryPage() {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [filter, setFilter] = useState("All");

    const categories = ["All", ...Array.from(new Set(galleryItems.map(item => item.category)))];

    const filteredItems = filter === "All"
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header */}
            <section className="bg-primary py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Gallery</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Glimpses of divinity and tradition.
                    </p>
                </div>
            </section>

            {/* Filter */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center gap-4 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? "bg-primary text-white shadow-md"
                                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedItem(item)}
                            className="group relative aspect-square overflow-hidden rounded-xl bg-stone-200 shadow-sm hover:shadow-lg transition-all"
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    // Fallback for missing maxresdefault
                                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
                                }}
                            />

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                                {item.type === 'video' ? (
                                    <PlayCircle className="text-white size-12 drop-shadow-lg" />
                                ) : (
                                    <ZoomIn className="text-white size-8 drop-shadow-lg" />
                                )}
                            </div>

                            {/* Video Indicator for mobile/always visible */}
                            {item.type === 'video' && (
                                <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full backdrop-blur-sm">
                                    <PlayCircle className="text-white size-4" />
                                </div>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-medium">{item.alt}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedItem(null)}
                >
                    <button
                        onClick={() => setSelectedItem(null)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
                    >
                        <X className="size-8" />
                    </button>

                    <div
                        className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300 bg-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedItem.type === 'video' ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedItem.videoId}?autoplay=1`}
                                title={selectedItem.alt}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img
                                src={selectedItem.src}
                                alt={selectedItem.alt}
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>

                    <div className="absolute bottom-8 left-0 right-0 text-center text-white pointer-events-none">
                        <p className="text-lg font-medium drop-shadow-md">{selectedItem.alt}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
