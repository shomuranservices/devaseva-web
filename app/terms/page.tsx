import { ScrollText, AlertCircle, RefreshCcw, Building2 } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 md:p-12">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-stone-800 mb-4">Terms & Conditions</h1>
                        <p className="text-stone-500">Effective Date: January 18, 2026</p>
                    </div>

                    <div className="space-y-8 text-stone-700 leading-relaxed">

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <ScrollText className="size-5" />
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing and using the DevaSeva website, booking Sevas, or making donations, you agree to be bound by these Terms and Conditions.
                                If you do not agree with any part of these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <Building2 className="size-5" />
                                2. Pooja & Seva Bookings
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Accuracy:</strong> You are responsible for providing accurate details (Name, Nakshatra, Gothra) for the Sankalpa. The temple is not responsible for errors in the performance of rituals due to incorrect information provided by you.</li>
                                <li><strong>Timing:</strong> While we strive to perform Sevas on the booked date, unforeseen circumstances (e.g., temple events, festivals, natural causes) may lead to rescheduling. In such cases, the Seva will be performed on the next available auspicious date.</li>
                                <li><strong>Presence:</strong> Physical presence is not mandatory for online bookings unless specified. The rituals will be performed in your name by the temple priests.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <RefreshCcw className="size-5" />
                                3. Refund & Cancellation Policy
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Donations:</strong> All donations made to the temple are <strong>final and non-refundable</strong>. Please verify the amount before confirming the transaction.</li>
                                <li><strong>Seva Bookings:</strong> Cancellations are allowed up to 48 hours before the scheduled Seva date. In such cases, a refund (minus processing fees) may be processed at the discretion of the temple management.</li>
                                <li><strong>Rescheduling:</strong> You may request to reschedule a Seva up to 24 hours in advance, subject to slot availability.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <AlertCircle className="size-5" />
                                4. User Conduct
                            </h2>
                            <p>
                                Users agree to use the website for lawful purposes only. Any attempt to disrupt the website, use fraudulent payment methods, or spam the temple administration will result in an immediate ban and potential legal action.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary mb-3">5. Disclaimer</h2>
                            <p>
                                The website and services are provided "as is". While we make every effort to ensure the accuracy of the information (timings, dates, panchangam), the temple management reserves the right to make changes to the schedule without prior online notice.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
