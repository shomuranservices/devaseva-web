import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-primary/5 border-t border-secondary/20 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold text-primary mb-4">DevaSeva</h3>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                            Your gateway to divine experiences. Book Poojas, Sevas, and contribute to the temple from the comfort of your home.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-purple-900">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/poojas" className="hover:text-primary">Book Pooja</Link></li>
                            <li><Link href="/sevas" className="hover:text-primary">Sevas</Link></li>
                            <li><Link href="/events" className="hover:text-primary">Events</Link></li>
                            <li><Link href="/donate" className="hover:text-primary">Donate</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-purple-900">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-primary">FAQs</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-purple-900">Visit Us</h4>
                        <p className="text-sm text-foreground/80">
                            Anekallu, Padpu, Post Kudthalthadka,<br />
                            Karopadi Village, Bantwal Taluk,<br />
                            Dakshina kannada, 574 279
                        </p>
                    </div>
                </div>

                <div className="pt-6 border-t border-secondary/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
                    <p>© {new Date().getFullYear()} DevaSeva. All rights reserved.</p>
                    <p>Developed by <a href="https://shomuran.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary/80 hover:text-primary transition-colors">Shomuran Services LLC</a></p>
                </div>
            </div>
        </footer>
    );
}
