import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import { Clock, MapPin, Info, ArrowRight, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center p-4 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1582510003544-529a67a84003?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4 text-white">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg font-serif px-4 leading-tight w-full max-w-full">
            Sri <span className="block sm:inline break-words">Jaladurgaparameshwari</span> Temple
          </h1>
          <div className="flex justify-center">
            <div className="border-4 border-primary/30 rounded-full overflow-hidden shadow-2xl size-48 md:size-64">
              <img
                src="/temple-deity.jpg"
                alt="Sri Jaladurgaparameshwari"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light tracking-wide">
            A sanctuary of peace, tradition, and divinity.
          </p>

          <div className="pt-8">
            <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 text-white border-none shadow-xl shadow-black/20" asChild>
              <Link href="/pooja-seva">
                Book Sevas Online
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Temple Details & History */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                <Info className="size-4" />
                Since 2017
              </div>
              <h2 className="text-4xl font-bold text-stone-800 font-serif">Our History & Legacy</h2>
              <p className="text-stone-600 text-lg leading-relaxed">
                Established nearly a decade ago, Sri Jaladurgaparameshwari Temple has been a beacon of spirituality for the community.
                Built in the traditional Dravidian architectural style, the temple stands as a testament to our rich cultural heritage.
              </p>
              <p className="text-stone-600 text-lg leading-relaxed">
                The main deity, Goddess Jaladurgaparameshwari, is the embodiment of strength and compassion. Devotees from all walks of life visit to seek her blessings for protection and prosperity.
              </p>
              <Button variant="outline" className="mt-4 gap-2 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary">
                Read Full History
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg h-64 bg-stone-200">
                  <img src="/history-7.jpg" alt="Temple History 7" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 bg-stone-200">
                  <img src="/history-1.jpg" alt="Temple History 1" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg h-64 bg-stone-200">
                  <img src="/history-4.jpg" alt="Temple History 4" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-64 bg-stone-200">
                  <img src="/history-5.jpg" alt="Temple History 5" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Maharshi Agastya Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-2xl h-[500px] border-4 border-stone-100">
              <img
                src="/agastya.jpg"
                alt="Maharshi Agastya"
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-4xl font-bold text-stone-800 font-serif">Maharshi Agastya</h2>
              <p className="text-stone-600 text-lg leading-relaxed">
                Revered as one of the Saptarishis, Maharshi Agastya is a pivotal figure in our spiritual lineage. His immense contributions to Vedic literature, medicine (Siddha), and spirituality have shaped our traditions.
              </p>
              <p className="text-stone-600 text-lg leading-relaxed">
                His presence in our temple complex invokes a deep sense of wisdom and purity, guiding devotees towards the path of knowledge and inner peace.
              </p>
              <p className="text-stone-600 text-lg leading-relaxed">
                He appears in numerous history and Puranas including Ramayana and Mahabharata. He is also revered in the puranic literature of Shaktism and Vaishnavism,the footprint of the great Maharshi can be seen in almost every field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-white border-t border-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              icon={<Clock className="size-8 text-primary" />}
              title="Darshan Timings"
              content={
                <ul className="space-y-1 text-stone-600">
                  <li>Morning: 6:00 AM - 12:30 PM</li>
                  <li>Evening: 5:00 PM - 8:30 PM</li>
                  <li className="text-sm text-primary/80 pt-2 font-medium">Open all days</li>
                </ul>
              }
            />
            <InfoCard
              icon={<MapPin className="size-8 text-primary" />}
              title="Location"
              content={
                <div className="space-y-2 text-stone-600">
                  <p>Anekallu, Padpu, Post Kudthalthadka</p>
                  <p>Karopadi Village, Bantwal Taluk</p>
                  <p>Dakshina kannada, 574 279</p>
                  <Button variant="link" className="p-0 h-auto text-primary">Get Directions &rarr;</Button>
                </div>
              }
            />
            <InfoCard
              icon={<Calendar className="size-8 text-primary" />} // Using Calendar from lucide as imported in FeatureCard if needed, let's fix imports
              title="Upcoming Events"
              content={
                <div className="space-y-2 text-stone-600">
                  <p><span className="font-semibold text-stone-800">Ganesh Chaturthi</span> - Sep 15</p>
                  <p><span className="font-semibold text-stone-800">Sankashti</span> - Oct 02</p>
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <Link href="/calendar">View Calendar &rarr;</Link>
                  </Button>
                </div>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, content }: { icon: React.ReactNode, title: string, content: React.ReactNode }) {
  return (
    <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 bg-white p-3 rounded-xl inline-block shadow-sm ring-1 ring-black/5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-stone-800 mb-3 font-serif">{title}</h3>
      <div>
        {content}
      </div>
    </div>
  )
}

