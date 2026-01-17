import { Button } from "@/app/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-stone-50">
            {/* Header */}
            <section className="bg-primary py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Temple Administration</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Dedicated souls serving the divine and the community.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 space-y-20">

                {/* Managing Trustee Section */}
                <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-100">
                    <h2 className="text-3xl font-bold text-primary font-serif mb-8 text-center md:text-left">
                        Managing Trustee
                    </h2>
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-64 h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-lg border-4 border-stone-100">
                                <img
                                    src="/managing-trustee.jpg"
                                    alt="O. Shama Bhat"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-2xl font-bold text-stone-800">O. Shama Bhat</h3>
                                <p className="text-primary font-medium">Managing Trustee</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-stone-600 leading-relaxed md:ml-4">
                            <p className="text-lg font-medium text-stone-800">
                                O. Shama Bhat is a distinguished legal professional based in Mysore, Karnataka, with a career spanning over four decades.
                            </p>
                            <p>
                                While widely recognized for his legal expertise, he has also established himself as a dedicated researcher and author focused on ancient Indian history and spiritual traditions. O. Shama Bhat has been a prominent figure in the Mysore legal community.
                            </p>
                            <p>
                                Parallel to his legal practice, O. Shama Bhat has pursued a profound interest in the life and legacy of Sage Agastya. His work often centers on the intersection of ancient science and spirituality, resulting in significant scholarly contributions:
                            </p>

                            <div className="pl-4 border-l-4 border-primary/20 space-y-4 my-6">
                                <div>
                                    <h4 className="font-bold text-stone-800 text-lg">Author</h4>
                                    <p>He authored the work "History of Medical and Spiritual Science of Agastya," which examines the historical and scientific foundations of the Siddha and Vedic traditions attributed to Sage Agastya.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-stone-800 text-lg">Historical Documentation</h4>
                                    <p>His research is frequently referenced in the context of temple histories and the preservation of South Indian religious heritage. He is noted for his efforts in documenting the spiritual lineage and historical significance of ancient shrines.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Committee Members Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-3xl font-bold text-stone-800 font-serif">Committee Members</h2>
                        <div className="h-px bg-stone-200 flex-grow"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Placeholder for Committee Members - add data here later */}
                        <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm flex items-center justify-center min-h-[150px] text-stone-400 italic">
                            Committee members list to be updated.
                        </div>
                    </div>
                </section>

                {/* Priests Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-3xl font-bold text-stone-800 font-serif">Our Archakas (Priests)</h2>
                        <div className="h-px bg-stone-200 flex-grow"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Placeholder for Priests - add data here later */}
                        <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm flex items-center justify-center min-h-[150px] text-stone-400 italic">
                            Priests details to be updated.
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
