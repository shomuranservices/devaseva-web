import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Calendar, Heart, ShieldCheck } from "lucide-react";

export default function PoojaSeva() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative flex-1 flex flex-col justify-center items-center text-center p-8 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/10 to-transparent" />
                <div className="absolute inset-0 z-0 bg-[url('/pattern-bg.svg')] opacity-10" />

                <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                        </span>
                        Experience the Divine
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary drop-shadow-sm">
                        Book Poojas & Sevas <br />
                        <span className="text-secondary-foreground">From Anywhere</span>
                    </h1>

                    <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                        Connect with divinity through our seamless online booking platform. Perform rituals, offer donations, and seek blessings with ease.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="text-lg px-8 shadow-lg shadow-primary/20" asChild>
                            <Link href="/poojas">
                                Book a Pooja
                                <ArrowRight className="ml-2 size-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                            <Link href="/donate">
                                Make a Donation
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Why Choose DevaSeva?</h2>
                        <p className="text-muted-foreground text-lg">
                            We bring the temple to you. Trusted by thousands of devotees for authentic and hassle-free spiritual services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<ShieldCheck className="size-10 text-primary" />}
                            title="Verified Priests"
                            description="All rituals are performed by experienced and verified Vedic priests."
                        />
                        <FeatureCard
                            icon={<Calendar className="size-10 text-primary" />}
                            title="Easy Scheduling"
                            description="Book rituals at your convenience with our flexible calendar integration."
                        />
                        <FeatureCard
                            icon={<Heart className="size-10 text-primary" />}
                            title="Transparent Donations"
                            description="100% of your donations reach the temple trust with complete transparency."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-2xl bg-accent/30 border border-secondary/20 hover:border-secondary/50 transition-colors text-center group">
            <div className="mb-6 inline-flex p-4 rounded-full bg-white shadow-sm ring-1 ring-secondary/10 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    )
}
