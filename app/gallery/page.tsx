"use client";

import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

// Types
type GalleryImage = {
    src: string;
    alt: string;
    category: string;
};

const images: GalleryImage[] = [
    { src: "/gallery/Temple/temple-overview.jpg", alt: "Temple Overview", category: "Temple" },
    { src: "/temple-deity.jpg", alt: "Sri Jaladurgaparameshwari", category: "Deity" },
    { src: "/history-1.jpg", alt: "Temple History", category: "History" },
    { src: "/history-2.jpg", alt: "Temple History", category: "History" },
    { src: "/history-3.jpg", alt: "Temple History", category: "History" },
    { src: "/history-4.jpg", alt: "Temple History", category: "History" },
    { src: "/history-5.jpg", alt: "Temple History", category: "History" },
    { src: "/history-6.jpg", alt: "Temple History", category: "History" },
    { src: "/history-7.jpg", alt: "Temple History", category: "History" },
    { src: "/agastya.jpg", alt: "Maharshi Agastya", category: "Deity" },
];

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [filter, setFilter] = useState("All");

    const categories = ["All", ...Array.from(new Set(images.map(img => img.category)))];

    const filteredImages = filter === "All"
        ? images
        : images.filter(img => img.category === filter);

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
                    {filteredImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(img)}
                            className="group relative aspect-square overflow-hidden rounded-xl bg-stone-200 shadow-sm hover:shadow-lg transition-all"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                                <ZoomIn className="text-white size-8 drop-shadow-lg" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-medium">{img.alt}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                    >
                        <X className="size-8" />
                    </button>
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        className="max-h-[85vh] max-w-full rounded-lg shadow-2xl animate-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="absolute bottom-8 left-0 right-0 text-center text-white pointer-events-none">
                        <p className="text-lg font-medium drop-shadow-md">{selectedImage.alt}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
