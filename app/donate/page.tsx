import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DonatePage() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-primary mb-6">Online Donations</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Support the temple activities and annadanam through your generous contributions.
            </p>
            <Button size="lg" asChild>
                <Link href="/pooja-seva">
                    View Donation Options <ArrowRight className="ml-2 size-5" />
                </Link>
            </Button>
        </div>
    );
}
