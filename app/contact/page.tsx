import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-stone-50">
            {/* Header */}
            <section className="bg-primary py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Contact Us</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Get in touch with us for queries, sevas, and more.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-stone-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                        {/* Contact Details */}
                        <div className="space-y-10">
                            <h2 className="text-3xl font-bold text-stone-800 font-serif border-b border-stone-100 pb-4">
                                Reach Us At
                            </h2>

                            <div className="flex items-start gap-5">
                                <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0">
                                    <MapPin className="size-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl text-stone-800 mb-3">Temple Address</h3>
                                    <address className="text-stone-600 leading-relaxed not-italic text-lg">
                                        <p>Anekallu, Padpu, Post Kudthalthadka</p>
                                        <p>Karopadi Village, Bantwal Taluk</p>
                                        <p>Dakshina kannada, 574 279</p>
                                    </address>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0">
                                    <Phone className="size-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl text-stone-800 mb-3">Phone Number</h3>
                                    <a href="tel:+918277384166" className="text-stone-600 text-lg hover:text-primary transition-colors">
                                        +91 8277384166
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Developer Info */}
                        <div className="space-y-10">
                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                                <h3 className="font-semibold text-lg text-stone-500 uppercase tracking-widest mb-6">
                                    Website Information
                                </h3>

                                <div className="flex flex-col gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-lg shadow-sm text-stone-400 shrink-0">
                                            <Globe className="size-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-stone-500 mb-1">Website Developer</p>
                                            <a href="https://shomuran.com" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                                                Shomuran Services LLC
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-lg shadow-sm text-stone-400 shrink-0">
                                            <MapPin className="size-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-stone-500 mb-1">Address</p>
                                            <address className="text-stone-800 not-italic font-medium">
                                                <p>1321 Sago Ln</p>
                                                <p>Weston FL 33327</p>
                                                <p>USA</p>
                                            </address>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-lg shadow-sm text-stone-400 shrink-0">
                                            <Phone className="size-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-stone-500 mb-1">Phone</p>
                                            <a href="tel:+19547019510" className="text-stone-800 font-medium hover:text-primary transition-colors">
                                                +1 954 701 9510
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
