import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 md:p-12">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-stone-800 mb-4">Privacy Policy</h1>
                        <p className="text-stone-500">Last Updated: January 18, 2026</p>
                    </div>

                    <div className="space-y-8 text-stone-700 leading-relaxed">

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <Shield className="size-5" />
                                1. Introduction
                            </h2>
                            <p>
                                Welcome to the Sri Jaladurgaparameshwari Temple website ("DevaSeva"). We are committed to protecting your personal information and your right to privacy.
                                This policy explains what information we collect, how we use it, and your rights regarding your data when you use our services for booking Sevas or making donations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <FileText className="size-5" />
                                2. Information We Collect
                            </h2>
                            <p className="mb-4">
                                We collect personal information that you voluntarily provide to us when you register on the website, book a Seva, or make a donation. This includes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Personal Identity:</strong> Name, Phone Number, Email Address.</li>
                                <li><strong>Spiritual Details:</strong> Gothra, Nakshatra, and Rashi (used strictly for Sankalpa purposes during rituals).</li>
                                <li><strong>Transaction Data:</strong> Booking history, donation records, and payment status.</li>
                            </ul>
                            <p className="mt-4 text-sm bg-stone-50 p-4 rounded-lg border border-stone-100 italic">
                                Note: We do <strong>not</strong> store your credit card or banking details on our servers. All payment processing is handled securely by our payment gateway partner, Razorpay.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <Eye className="size-5" />
                                3. How We Use Your Information
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To perform the religious services (Sevas/Poojas) you have booked.</li>
                                <li>To include your name and details in the Sankalpa during the rituals.</li>
                                <li>To send booking confirmations, receipts, and Prasadam (if applicable).</li>
                                <li>To maintain a record of your donations for transparency and auditing.</li>
                                <li>To communicate regarding temple events or updates (only if you opt-in).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <Lock className="size-5" />
                                4. Data Sharing and Security
                            </h2>
                            <p>
                                We do not sell, trade, or rent your personal identification information to others. We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it.
                            </p>
                            <p className="mt-2">
                                Your data is shared only with:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><strong>Service Providers:</strong> Such as Razorpay (for payments) and Supabase (for secure database hosting).</li>
                                <li><strong>Temple Administration:</strong> Strictly for the purpose of managing bookings and donations.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3">5. Your Choices</h2>
                            <p>
                                You can review and update your personal information by logging into your User Profile.
                                If you wish to delete your account or have concerns about your data, please contact us.
                            </p>
                        </section>

                        <section className="border-t border-stone-100 pt-8 mt-8">
                            <h2 className="text-xl font-bold text-stone-800 mb-4">Contact Us</h2>
                            <p className="mb-2">If you have any questions about this Privacy Policy, please contact us:</p>
                            <address className="not-italic text-stone-600">
                                <strong>Sri Jaladurgaparameshwari Temple</strong><br />
                                Anekallu, Padpu, Post Kudthalthadka,<br />
                                Karopadi Village, Bantwal Taluk,<br />
                                Dakshina kannada, 574 279
                            </address>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
