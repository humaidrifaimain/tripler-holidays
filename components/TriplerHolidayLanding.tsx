"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Handshake,
  Hotel,
  Lock,
  ShieldCheck,
  Star,
  Truck,
  Users,
  Mail,
  Phone,
  MapPin,
  Send,
  X,
  Plus
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { sendWeb3Form } from "@/lib/web3forms";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const whyBookStats = [
  { value: "24/7", label: "Travel support" },
  { value: "23+", label: "Years industry experience" },
  { value: "50+", label: "Vehicles" },
  { value: "100+", label: "Destination partners" }
];

const whyBookItems = [
  { icon: Phone, text: "24/7 support whenever you need us" },
  { icon: CheckCircle2, text: "Fast, seamless booking experience" },
  { icon: CalendarDays, text: "Free cancellation up to 48 hours on transport services" },
  { icon: Handshake, text: "Trusted local partners for reliable travel" },
  { icon: ShieldCheck, text: "Quick support for changes and special requests" }
];

const heroSlides = [
  {
    image: "/images/home/pexels-anas-mohamed-nuski-3784747-5620146.jpg",
    alt: "Nuwara Eliya lake and tea country landscape",
    position: "center 42%"
  }
];

const attractionImages = {
  galleFort: "/images/new-pic/aerial-view-tropical-coastline-beach-islet.jpg",
  royalBotanicalGardens: "/images/attractions/home-carousel/royal-botanical-gardens.jpg",
  littleAdamsPeak: "/images/new-pic/9948_banner.jpg",
  anuradhapura: "/images/attractions/home-carousel/anuradhapura.jpg",
  gangaramaya: "/images/new-pic/Colombo.jpg",
  polonnaruwa: "/images/attractions/home-carousel/polonnaruwa.jpg",
  yala: "/images/new-pic/article_1751903499355_0.jpg",
  pigeonIsland: "/images/attractions/home-carousel/pigeon-island.jpg",
  hortonPlains: "/images/new-pic/hero-gallery-c29f7dfb-800x450.jpeg",
  minneriya: "/images/attractions/home-carousel/minneriya-national-park.jpg",
  sinharaja: "/images/new-pic/9a63969e-ffa1-4da1-928f-473f642ea300.jpg",
  sigiriya: "/images/new-pic/Sigiriya-28.jpg"
};

type AttractionCard = {
  title: string;
  tag: string;
  nights: string;
  price: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  bestTime: string;
};

const hotTours: AttractionCard[] = [
  {
    title: "Galle Dutch Fort",
    tag: "Heritage",
    nights: "Seaside heritage site with scenic views",
    price: "Galle",
    image: attractionImages.galleFort,
    gallery: [
      "https://images.pexels.com/photos/29813518/pexels-photo-29813518.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/31032907/pexels-photo-31032907.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/31791361/pexels-photo-31791361.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "/images/home/galle-fort-coastline-4k.jpg"
    ],
    description:
      "Galle Fort is the south coast's most elegant heritage quarter, where ocean-facing ramparts protect a living old town of Dutch villas, churches, galleries, cafes and boutique hotels. The experience is best taken slowly: walk the walls as the light turns gold, step through narrow colonial streets, then pause by the lighthouse as the Indian Ocean wraps around the fort.",
    highlights: ["UNESCO-listed old town", "Dutch-era ramparts", "Lighthouse and sunset viewpoints"],
    bestTime: "Late afternoon for cooler walks and sea views"
  },
  {
    title: "Royal Botanical Gardens",
    tag: "Gardens",
    nights: "Scenic garden landscape with tropical flora",
    price: "Peradeniya",
    image: attractionImages.royalBotanicalGardens,
    gallery: [
      attractionImages.royalBotanicalGardens,
      "https://images.pexels.com/photos/31048033/pexels-photo-31048033.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&fm=jpg&q=90&w=3840"
    ],
    description:
      "The Royal Botanical Gardens at Peradeniya offer a calm, refined break beside the Mahaweli River, with shaded avenues, orchid houses, immense palms and beautifully maintained tropical landscapes. It is the kind of stop that balances a Kandy cultural day perfectly: relaxed, scenic, and rich in small details for guests who enjoy nature without a difficult walk.",
    highlights: ["Orchid collection", "Palm avenues", "Mahaweli River setting"],
    bestTime: "Morning or late afternoon for softer light"
  },
  {
    title: "Little Adam's Peak",
    tag: "Highlands",
    nights: "Easy trek with stunning mountain scenery",
    price: "Ella",
    image: attractionImages.littleAdamsPeak,
    gallery: [
      attractionImages.littleAdamsPeak,
      "https://images.unsplash.com/photo-1643793418497-689d2f8a4eeb?auto=format&fit=crop&fm=jpg&q=90&w=3840",
      "https://images.unsplash.com/photo-1643793416337-1a14ac3cbf52?auto=format&fit=crop&fm=jpg&q=90&w=3840",
      "/images/home/ella-nine-arches-4k.jpg"
    ],
    description:
      "Little Adam's Peak is one of Ella's most rewarding soft-adventure experiences: a manageable ridge walk with sweeping views over tea country, valley lines and the famous Ella Gap. It suits travelers who want a highland viewpoint without a demanding trek, and it pairs beautifully with Nine Arches Bridge, a tea estate visit and a slow afternoon in Ella.",
    highlights: ["Short scenic hike", "Tea-country views", "Ella Gap panorama"],
    bestTime: "Sunrise or late afternoon"
  },
  {
    title: "Anuradhapura",
    tag: "Ancient City",
    nights: "Historic ruins with ancient stupas and temples",
    price: "North Central",
    image: attractionImages.anuradhapura,
    gallery: [
      attractionImages.anuradhapura,
      "https://images.pexels.com/photos/32774288/pexels-photo-32774288.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/33713450/pexels-photo-33713450.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "/images/holiday-tours/cultural-exploration-kandy.jpg"
    ],
    description:
      "Anuradhapura is a grand sacred landscape, not just a single stop. Ancient stupas, monastic ruins, reservoirs and pilgrimage sites spread across a vast former capital, giving travelers a powerful sense of Sri Lanka's early Buddhist civilization. A private vehicle and guide make the day feel graceful rather than rushed, with time for quiet moments at the most important monuments.",
    highlights: ["Ancient capital", "Sacred stupas", "Jaya Sri Maha Bodhi area"],
    bestTime: "Early morning with a guide or driver"
  },
  {
    title: "Gangaramaya Temple",
    tag: "Culture",
    nights: "Famous Buddhist temple with cultural museum",
    price: "Colombo",
    image: attractionImages.gangaramaya,
    gallery: [
      attractionImages.gangaramaya,
      "https://images.pexels.com/photos/19759365/pexels-photo-19759365.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/31828035/pexels-photo-31828035.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/12116388/pexels-photo-12116388.jpeg?auto=compress&cs=tinysrgb&w=3840"
    ],
    description:
      "Gangaramaya Temple brings Colombo's cultural personality into focus, combining active worship spaces, ornate statues, museum rooms and lakeside atmosphere near Beira Lake. It is ideal for an arrival or departure day in the capital, adding depth to the city without requiring a long detour from hotels, shopping districts or coastal drives.",
    highlights: ["Colombo cultural landmark", "Temple museum", "Beira Lake area"],
    bestTime: "Morning or early evening"
  },
  {
    title: "Polonnaruwa",
    tag: "UNESCO",
    nights: "Historic kingdom with temples and statues",
    price: "North Central",
    image: attractionImages.polonnaruwa,
    gallery: [
      attractionImages.polonnaruwa,
      "https://images.pexels.com/photos/33171754/pexels-photo-33171754.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/11398966/pexels-photo-11398966.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/13764966/pexels-photo-13764966.jpeg?auto=compress&cs=tinysrgb&w=3840"
    ],
    description:
      "Polonnaruwa feels refined and cinematic: palace ruins, stone temples, moonstones, reservoirs and sculpture arranged in a more compact ancient city than Anuradhapura. It is excellent for guests who want a deep heritage experience without an exhausting day, especially when planned with shade breaks, a guide and a comfortable transfer between key sites.",
    highlights: ["Ancient royal city", "Vatadage and palace ruins", "Parakrama Samudra reservoir"],
    bestTime: "Morning, with cycling or a private vehicle"
  },
  {
    title: "Yala National Park",
    tag: "Safari",
    nights: "Popular safari park with leopard sightings",
    price: "Southern",
    image: attractionImages.yala,
    gallery: [
      attractionImages.yala,
      "https://images.pexels.com/photos/17281950/pexels-photo-17281950.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/33130315/pexels-photo-33130315.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/321526/pexels-photo-321526.jpeg?auto=compress&cs=tinysrgb&w=3840",
    ],
    description:
      "Yala National Park is Sri Lanka's signature safari address, where dry forest, grassland, lagoons and coastline create a dramatic wildlife setting. Leopards are the headline, but the real luxury is the full safari rhythm: dawn departures, elephants crossing open tracks, crocodiles near water, birdlife in the light and a landscape that feels wild but beautifully accessible.",
    highlights: ["Leopard safari country", "Elephants and crocodiles", "Forest, lagoon and beach habitats"],
    bestTime: "Dawn safari for wildlife activity"
  },
  {
    title: "Pigeon Island",
    tag: "Marine",
    nights: "Snorkeling spot near Trincomalee with coral reefs",
    price: "Trincomalee",
    image: attractionImages.pigeonIsland,
    gallery: [
      attractionImages.pigeonIsland,
      "https://images.pexels.com/photos/37106726/pexels-photo-37106726.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/34037258/pexels-photo-34037258.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/5106967/pexels-photo-5106967.jpeg?auto=compress&cs=tinysrgb&w=3840",
    ],
    description:
      "Pigeon Island National Park is a polished east-coast marine escape just off Nilaveli, reached by a short boat ride from the Trincomalee coast. On calm days the water is clear, the reef is close, and the experience feels effortless: beach time, snorkeling, coral views and a bright island setting that works especially well inside a slower east-coast itinerary.",
    highlights: ["Marine national park", "Snorkeling and coral", "Short boat ride from Nilaveli"],
    bestTime: "Calm east-coast season, usually May to September"
  },
  {
    title: "Horton Plains",
    tag: "Nature",
    nights: "Misty grasslands and dramatic World's End views",
    price: "Central Highlands",
    image: attractionImages.hortonPlains,
    gallery: [
      "https://images.pexels.com/photos/30277198/pexels-photo-30277198.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/36097227/pexels-photo-36097227.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/33959559/pexels-photo-33959559.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&fm=jpg&q=90&w=3840"
    ],
    description:
      "Horton Plains is Sri Lanka at its most atmospheric: cool highland air, open grasslands, cloud forest edges and walking trails that lead toward the famous World's End escarpment. It is a premium nature day when timed correctly, with an early start, warm layers and enough space in the schedule to enjoy the stillness before mist softens the view.",
    highlights: ["World's End viewpoint", "Baker's Falls", "Cloud forest and grassland"],
    bestTime: "Very early morning before mist closes in"
  },
  {
    title: "Minneriya National Park",
    tag: "Wildlife",
    nights: "Elephant gathering and open plains safari",
    price: "Habarana",
    image: attractionImages.minneriya,
    gallery: [
      attractionImages.minneriya,
      "https://images.pexels.com/photos/16053968/pexels-photo-16053968.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/14697225/pexels-photo-14697225.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "/images/srilankan-pics/IMG_0070.jpg"
    ],
    description:
      "Minneriya National Park is one of the island's most graceful elephant experiences, centered around the historic Minneriya tank and the open dry-zone habitat around it. During the right season, herds gather near the reservoir in a natural spectacle that feels calm, spacious and unforgettable, especially as the afternoon light moves across the grasslands.",
    highlights: ["Elephant gathering", "Historic reservoir", "Dry-zone safari habitat"],
    bestTime: "Dry season afternoons for elephant activity"
  },
  {
    title: "Sinharaja Rainforest",
    tag: "Rainforest",
    nights: "Lush UNESCO rainforest with rare wildlife",
    price: "Sabaragamuwa",
    image: attractionImages.sinharaja,
    gallery: [
      attractionImages.sinharaja,
      "https://images.pexels.com/photos/36847027/pexels-photo-36847027.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/32795451/pexels-photo-32795451.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/30935691/pexels-photo-30935691.jpeg?auto=compress&cs=tinysrgb&w=3840",
    ],
    description:
      "Sinharaja Rainforest is a deep green sanctuary for travelers who want Sri Lanka's rarest natural atmosphere rather than a standard sightseeing stop. Guided walks move through humid forest, streams, bird calls, giant trees and dense biodiversity, creating a slower, immersive experience that feels private, alive and beautifully different from the coast or cultural triangle.",
    highlights: ["UNESCO rainforest", "Endemic birds", "Guided forest walks"],
    bestTime: "Morning walks with a local nature guide"
  },
  {
    title: "Sigiriya Rock Fortress",
    tag: "Heritage",
    nights: "UNESCO rock fortress and iconic viewpoint",
    price: "Matale",
    image: attractionImages.sigiriya,
    gallery: [
      "https://images.pexels.com/photos/13391116/pexels-photo-13391116.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/31154120/pexels-photo-31154120.jpeg?auto=compress&cs=tinysrgb&w=3840",
      "https://images.pexels.com/photos/20648406/pexels-photo-20648406.jpeg?auto=compress&cs=tinysrgb&w=3840",
      attractionImages.sigiriya
    ],
    description:
      "Sigiriya is Sri Lanka's unmistakable icon: a royal rock fortress rising above the central plains with water gardens, frescoes, the Mirror Wall and the famous lion-paw gateway on the climb. The summit rewards the effort with palace ruins and sweeping views, making it one of the most memorable luxury itinerary anchors for first-time visitors.",
    highlights: ["UNESCO rock fortress", "Frescoes and water gardens", "Summit palace ruins"],
    bestTime: "Early morning to avoid heat and crowds"
  }
];

const sriLankaTours = [
  {
    title: "Sigiriya (Lion Rock)",
    subtitle: "Top Attraction",
    duration: "Ideal visit: 3-4 hours",
    route: "Matale District, Central Province",
    image: attractionImages.sigiriya,
    tags: ["#UNESCO", "#History", "#Must Visit"],
    idealFor: "Culture lovers and first-time visitors",
    href: "/holiday-tours"
  },
  {
    title: "Temple of the Tooth (Kandy)",
    subtitle: "Top Attraction",
    duration: "Ideal visit: 2-3 hours",
    route: "Kandy, Central Province",
    image: "/images/attractions/temple-of-tooth-kandy.jpg",
    tags: ["#Sacred", "#Culture", "#UNESCO"],
    idealFor: "Spiritual and heritage experiences",
    href: "/holiday-tours"
  },
  {
    title: "Nine Arches Bridge & Ella",
    subtitle: "Top Attraction",
    duration: "Ideal visit: Half day",
    route: "Ella, Badulla District",
    image: "/images/home/ella-nine-arches-4k.jpg",
    tags: ["#Scenic", "#Hiking", "#Train Ride"],
    idealFor: "Nature lovers and photographers",
    href: "/holiday-tours"
  },
  {
    title: "Yala National Park",
    subtitle: "Top Attraction",
    duration: "Ideal visit: Full day safari",
    route: "Southern & Uva Provinces",
    image: attractionImages.yala,
    tags: ["#Wildlife", "#Safari", "#Leopards"],
    idealFor: "Wildlife and adventure travelers",
    href: "/holiday-tours"
  },
  {
    title: "Galle Fort",
    subtitle: "Top Attraction",
    duration: "Ideal visit: 2-4 hours",
    route: "Galle, Southern Province",
    image: attractionImages.galleFort,
    tags: ["#Colonial", "#UNESCO", "#Coastal"],
    idealFor: "Couples and cultural explorers",
    href: "/holiday-tours"
  },
  {
    title: "Royal Botanical Gardens",
    subtitle: "Top Attraction",
    duration: "Ideal visit: 2-3 hours",
    route: "Peradeniya, Kandy",
    image: attractionImages.royalBotanicalGardens,
    tags: ["#Gardens", "#Nature", "#Relaxed"],
    idealFor: "Families and garden lovers",
    href: "/holiday-tours"
  },
  {
    title: "Anuradhapura",
    subtitle: "Top Attraction",
    duration: "Ideal visit: Full day",
    route: "North Central Province",
    image: attractionImages.anuradhapura,
    tags: ["#Ancient City", "#Stupas", "#Culture"],
    idealFor: "Heritage travelers and history lovers",
    href: "/holiday-tours"
  },
  {
    title: "Polonnaruwa",
    subtitle: "Top Attraction",
    duration: "Ideal visit: Half to full day",
    route: "North Central Province",
    image: attractionImages.polonnaruwa,
    tags: ["#UNESCO", "#Ruins", "#Kingdom"],
    idealFor: "Cultural explorers",
    href: "/holiday-tours"
  },
  {
    title: "Pigeon Island",
    subtitle: "Top Attraction",
    duration: "Ideal visit: Half day",
    route: "Trincomalee, Eastern Province",
    image: attractionImages.pigeonIsland,
    tags: ["#Snorkeling", "#Marine", "#Coral Reef"],
    idealFor: "Beach and ocean lovers",
    href: "/holiday-tours"
  },
  {
    title: "Sinharaja Rainforest",
    subtitle: "Top Attraction",
    duration: "Ideal visit: Full day",
    route: "Sabaragamuwa & Southern Provinces",
    image: attractionImages.sinharaja,
    tags: ["#Rainforest", "#UNESCO", "#Nature"],
    idealFor: "Nature travelers and birdwatchers",
    href: "/holiday-tours"
  }
];

function SriLankaShowcase() {
  const [active, setActive] = useState(0);
  const tour = sriLankaTours[active];

  const goNext = useCallback(() => setActive(i => (i + 1) % sriLankaTours.length), []);
  const goPrev = useCallback(() => setActive(i => (i - 1 + sriLankaTours.length) % sriLankaTours.length), []);

  useEffect(() => {
    const timer = window.setInterval(goNext, 4500);
    return () => window.clearInterval(timer);
  }, [goNext]);

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-[#111820]/14 bg-[#F5F1E8]/80 backdrop-blur-md p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#D98928]/10 blur-3xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[#D98928]/8 blur-3xl pointer-events-none" />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center relative z-10">
          {/* Left: text */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D98928]">
                  <span className="h-px w-8 bg-[#D98928]" />
                  {tour.subtitle}
                </span>
                <h2 className="font-space fluid-title mt-4 font-bold uppercase text-[#111820]">{tour.title}</h2>
                <div className="mt-4 flex items-center gap-3 text-sm text-[#111820]/70">
                  <Clock3 className="h-4 w-4 text-[#D98928]" />
                  <span className="font-semibold">{tour.duration}</span>
                </div>
                <p className="mt-4 text-sm leading-8 text-[#111820]/75 max-w-lg">{tour.route}</p>
                <p className="mt-3 text-xs text-[#111820]/55 italic">Ideal for: {tour.idealFor}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tour.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#111820]/5 border border-[#111820]/10 text-[#111820]/80">{tag}</span>
                  ))}
                </div>
                <div className="mt-8">
                  <a href={tour.href} className="inline-flex items-center gap-3 bg-[#111820] hover:bg-[#D98928] text-white pl-7 pr-2 py-2 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-md group">
                    Choose Tour
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#111820] transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex items-center gap-2">
              {sriLankaTours.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === active ? "w-8 bg-[#D98928]" : "w-2 bg-[#111820]/20 hover:bg-[#111820]/40"}`} aria-label={`Slide ${i + 1}`} />
              ))}
              <span className="ml-3 text-xs font-bold text-[#111820]/40">{String(active + 1).padStart(2, '0')} / {String(sriLankaTours.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Right: square image */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-square overflow-hidden rounded-[32px] border-[6px] border-[#F5F1E8] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img key={tour.image} src={tour.image} alt={tour.title} className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <AnimatePresence mode="wait">
                <motion.div key={`lbl-${active}`} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center w-full px-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                  <p className="text-xs font-bold uppercase tracking-wider">{tour.subtitle}</p>
                  <p className="text-lg font-space font-extrabold uppercase mt-1">Sri Lanka</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <button onClick={goPrev} className="absolute left-0 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-[#F5F1E8] shadow-lg border border-[#111820]/10 hover:bg-[#111820] hover:text-white transition z-20 cursor-pointer" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={goNext} className="absolute right-0 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-[#111820] text-white shadow-lg hover:bg-[#D98928] transition z-20 cursor-pointer" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TriplerHolidayLanding() {
  const pageRef = useRef<HTMLDivElement>(null);
  const attractionCardRef = useRef<HTMLButtonElement | null>(null);
  const attractionSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const [customTourForm, setCustomTourForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [attractionIndex, setAttractionIndex] = useState(hotTours.length);
  const [attractionStep, setAttractionStep] = useState(0);
  const [isAttractionResetting, setIsAttractionResetting] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<AttractionCard | null>(null);
  const [attractionPhotoIndex, setAttractionPhotoIndex] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const currentHeroSlide = heroSlides[activeHeroSlide] ?? heroSlides[0];
  const [isAttractionPaused, setIsAttractionPaused] = useState(false);
  const attractionPauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const attractionLoop = [...hotTours, ...hotTours, ...hotTours.slice(0, 4)];
  const selectedAttractionIndex = selectedAttraction
    ? hotTours.findIndex(tour => tour.title === selectedAttraction.title)
    : -1;

  const pauseAttractionAutoPlay = useCallback(() => {
    setIsAttractionPaused(true);
    if (attractionPauseTimerRef.current) clearTimeout(attractionPauseTimerRef.current);
    attractionPauseTimerRef.current = setTimeout(() => {
      setIsAttractionPaused(false);
    }, 5000);
  }, []);

  const goToCarouselAttraction = useCallback((direction: -1 | 1) => {
    setIsAttractionResetting(false);
    setAttractionIndex(index => {
      const normalized =
        index <= 0 || index >= hotTours.length * 2
          ? hotTours.length + (((index % hotTours.length) + hotTours.length) % hotTours.length)
          : index;
      return normalized + direction;
    });
  }, []);

  const handleTopAttractionsTouchStart = useCallback((event: React.TouchEvent<HTMLElement>) => {
    pauseAttractionAutoPlay();
    const touch = event.touches[0];
    if (!touch) return;
    attractionSwipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, [pauseAttractionAutoPlay]);

  const handleTopAttractionsTouchEnd = useCallback((event: React.TouchEvent<HTMLElement>) => {
    pauseAttractionAutoPlay();
    const start = attractionSwipeStartRef.current;
    const touch = event.changedTouches[0];
    attractionSwipeStartRef.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
    if (!isHorizontalSwipe) return;

    goToCarouselAttraction(deltaX < 0 ? 1 : -1);
  }, [goToCarouselAttraction, pauseAttractionAutoPlay]);

  const openAttractionByDirection = useCallback((direction: -1 | 1) => {
    setSelectedAttraction(current => {
      const currentIndex = current ? hotTours.findIndex(tour => tour.title === current.title) : 0;
      const nextIndex = (currentIndex + direction + hotTours.length) % hotTours.length;
      return hotTours[nextIndex];
    });
    setAttractionPhotoIndex(0);
  }, []);

  const handleAttractionTouchStart = useCallback((event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    attractionSwipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleAttractionTouchEnd = useCallback((event: TouchEvent<HTMLElement>) => {
    const start = attractionSwipeStartRef.current;
    const touch = event.changedTouches[0];
    attractionSwipeStartRef.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 58 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35;
    if (!isHorizontalSwipe) return;

    openAttractionByDirection(deltaX < 0 ? 1 : -1);
  }, [openAttractionByDirection]);

  useEffect(() => {
    // Defer animation initialization to after first paint
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Parallax layering
        gsap.utils.toArray<HTMLElement>(".parallax-layer").forEach(layer => {
          const depth = Number(layer.dataset.depth ?? "12");
          gsap.to(layer, {
            yPercent: depth,
            ease: "none",
            scrollTrigger: {
              trigger: layer.closest("section"),
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });

        // Subtle float animation for cards
        gsap.utils.toArray<HTMLElement>(".float-tour-card").forEach((card, index) => {
          gsap.to(card, {
            y: -8 - (index % 2) * 5,
            duration: 2.5 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }, pageRef);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const measureAttractionStep = () => {
      const card = attractionCardRef.current;
      if (!card) return;
      const row = card.parentElement;
      const styles = row ? window.getComputedStyle(row) : null;
      const gap = styles ? Number.parseFloat(styles.columnGap || styles.gap || "0") : 0;
      setAttractionStep(card.getBoundingClientRect().width + gap);
    };

    measureAttractionStep();
    window.addEventListener("resize", measureAttractionStep);
    return () => window.removeEventListener("resize", measureAttractionStep);
  }, []);

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    // Defer hero slide rotation
    const timer = setTimeout(() => {
      const interval = window.setInterval(() => {
        setActiveHeroSlide(index => (index + 1) % heroSlides.length);
      }, 2500);
      return () => window.clearInterval(interval);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedAttraction || isAttractionPaused) return;

    // Defer attraction carousel autorotate
    const timer = setTimeout(() => {
      const interval = window.setInterval(() => {
        setIsAttractionResetting(false);
        setAttractionIndex(index => index + 1);
      }, 2600);
      return () => window.clearInterval(interval);
    }, 2400);

    return () => clearTimeout(timer);
  }, [selectedAttraction, isAttractionPaused]);

  useEffect(() => {
    if (attractionIndex > 0 && attractionIndex < hotTours.length * 2) return;

    const reset = window.setTimeout(() => {
      setIsAttractionResetting(true);
      setAttractionIndex(hotTours.length + (((attractionIndex % hotTours.length) + hotTours.length) % hotTours.length));
    }, 720);

    return () => window.clearTimeout(reset);
  }, [attractionIndex]);

  useEffect(() => {
    if (!selectedAttraction) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalLeft = document.body.style.left;
    const originalRight = document.body.style.right;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const lenis = (window as any).__lenis;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedAttraction(null);
      }
    };

    document.documentElement.classList.add("lenis-stopped");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.left = originalLeft;
      document.body.style.right = originalRight;
      document.body.style.width = originalWidth;
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
      window.removeEventListener("keydown", handleKeyDown);
      window.scrollTo(0, scrollY);
    };
  }, [selectedAttraction]);

  useEffect(() => {
    if (!selectedAttraction) {
      setAttractionPhotoIndex(0);
      return;
    }

    setAttractionPhotoIndex(0);
    const timer = window.setInterval(() => {
      setAttractionPhotoIndex(index => (index + 1) % selectedAttraction.gallery.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [selectedAttraction]);

  return (
    <main className="scandi-page light-mode-travel min-h-screen overflow-x-hidden text-[#111820]">
      <div ref={pageRef} className="scandi-panel relative">
        <SiteHeader variant="transparent" ctaLabel="Find a Tour" ctaHref="/holiday-tours" />

        {/* 1. HERO SECTION */}
        <section className="hero-mobile header-safe-top relative w-full overflow-hidden text-white bg-[#082B49]">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentHeroSlide.image}
              src={currentHeroSlide.image}
              alt={currentHeroSlide.alt}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-[0.9] contrast-[1.04] saturate-[1.04]"
              style={{ objectPosition: currentHeroSlide.position }}
              initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.025, filter: "blur(6px)" }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
              fetchPriority={activeHeroSlide === 0 ? "high" : "auto"}
              loading={activeHeroSlide === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[#082B49]/28" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082B49]/18 via-[#082B49]/10 to-[#082B49]/40" />
          <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#061826]/72 via-[#082B49]/42 to-transparent" />
          <div className="absolute inset-x-0 bottom-[11vh] mx-auto h-[22rem] max-w-4xl bg-[radial-gradient(ellipse_at_center,rgba(6,24,38,0.50)_0%,rgba(8,43,73,0.30)_44%,transparent_72%)]" />

          <div className="absolute inset-0 z-20 flex items-end justify-center pb-10 text-center sm:pb-[14vh] lg:pb-[16vh]">
            <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 }
                }
              }}
              className="mx-auto max-w-md sm:max-w-3xl lg:max-w-4xl"
              data-hero-content
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
                }}
                className="font-space text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(8,43,73,0.5)]"
              >
                Escape Into The
                <br />
                <span className="text-[#D98928]">Extraordinary</span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F1E8]/90 sm:text-base sm:leading-8 drop-shadow-[0_2px_10px_rgba(8,43,73,0.5)]"
              >
                Discover Sri Lanka & Beyond through refined travel experiences.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-7 sm:gap-3"
              >
                <a
                  href="/holiday-tours"
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#D98928] py-2 pl-5 pr-2 text-[11px] font-bold uppercase tracking-wider text-[#111820] shadow-lg transition-all duration-300 hover:bg-[#D98928] group sm:gap-3 sm:pl-6 sm:text-[11px]"
                >
                  Choose Tour
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#111820] transition-transform duration-300 group-hover:rotate-45 sm:h-8 sm:w-8">
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                </a>

                <a
                  href="/holiday-tours#tour-quote"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-[#082B49] sm:min-h-11 sm:px-5 sm:text-[11px]"
                >
                  Plan your trip
                </a>
              </motion.div>
            </motion.div>
            </div>
          </div>
        </section>

        {/* 3. TOP ATTRACTION COLLAGE GRID WITH CURVED TRAIL */}
        <section className="relative px-4 py-12 sm:px-6 sm:py-20 overflow-hidden">
          
          {/* Curve route line winding behind collage cards */}
          <svg className="absolute inset-x-0 top-1/4 w-full h-[60%] pointer-events-none opacity-30 hidden md:block" viewBox="0 0 1440 600" fill="none">
            <path
              d="M 100,100 C 400,200 450,450 780,250 C 1100,50 1200,450 1380,350"
              stroke="#D98928"
              strokeWidth="2.5"
              strokeDasharray="6 10"
              className="route-dash"
            />
          </svg>

          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
                  <span className="h-px w-9 bg-[#D98928]" />
                  Sri Lanka
                </span>
                <h2 className="font-space fluid-title mt-4 font-bold uppercase text-[#111820]">
                  Top <span className="inline-block rounded-full bg-[#F5F1E8]/80 border border-[#111820]/12 px-6 py-1.5 shadow-sm text-[#D98928] leading-none">Attractions</span>
                </h2>
              </div>
              <div className="flex max-w-md flex-col items-start gap-4 md:items-end">
                <p className="text-left text-sm leading-7 text-[#111820]/82 md:text-right">
                  Handpicked Sri Lankan highlights and signature destinations curated for unforgettable journeys.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToCarouselAttraction(-1)}
                    aria-label="Previous attraction"
                    className="grid h-11 w-11 place-items-center rounded-full border border-[#111820]/14 bg-white/65 text-[#111820] shadow-[0_12px_30px_rgba(17,24,32,0.08)] backdrop-blur-md transition hover:border-[#D98928] hover:bg-[#111820] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D98928]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToCarouselAttraction(1)}
                    aria-label="Next attraction"
                    className="grid h-11 w-11 place-items-center rounded-full border border-[#111820]/14 bg-[#111820] text-white shadow-[0_12px_30px_rgba(17,24,32,0.12)] transition hover:border-[#D98928] hover:bg-[#D98928] hover:text-[#111820] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D98928]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Auto-scrolling attraction cards */}
            <div
              className="mt-10 overflow-hidden pb-4 pt-6 sm:mt-14"
              onTouchStart={handleTopAttractionsTouchStart}
              onTouchEnd={handleTopAttractionsTouchEnd}
              onMouseEnter={pauseAttractionAutoPlay}
              onMouseLeave={() => setIsAttractionPaused(false)}
            >
              <div
                className="flex gap-4 sm:gap-7"
                style={{
                  opacity: attractionStep ? 1 : 0,
                  transform: `translate3d(-${attractionIndex * attractionStep}px, 0, 0)`,
                  transition: attractionStep === 0 || isAttractionResetting ? "none" : "transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                }}
              >
                {attractionLoop.map((tour, index) => (
                  <motion.button
                    type="button"
                    key={`${tour.title}-${index}`}
                    ref={index === 0 ? attractionCardRef : undefined}
                    onClick={() => setSelectedAttraction(tour)}
                    aria-label={`Open details for ${tour.title}`}
                    whileHover={{ y: -4, scale: 1.015 }}
                    className="group relative h-[310px] w-full shrink-0 cursor-pointer overflow-hidden rounded-[22px] border border-[#111820]/12 bg-[#F5F1E8] text-left ring-1 ring-white/45 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D98928] sm:h-[318px] sm:w-[292px] lg:w-[300px]"
                  >
                    <div className="absolute inset-x-0 top-0 h-[68%] overflow-hidden bg-[#082B49]">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="h-full w-full object-cover contrast-[1.04] saturate-[1.08] transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#082B49]/18 via-transparent to-[#082B49]/22" />
                    </div>

                    <span className="absolute left-4 top-4 z-10 rounded-full border border-[#D98928]/75 bg-[#082B49] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#D98928] shadow-[0_8px_20px_rgba(8,43,73,0.34)]">
                      {tour.tag}
                    </span>

                    <span className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-[#F5F1E8]/45 bg-[#D98928] text-[#111820] opacity-0 shadow-lg backdrop-blur-md transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 min-h-[34%] bg-[#F5F1E8] px-4 py-4">
                      <h3 className="font-space text-lg font-extrabold leading-tight text-[#082B49] sm:text-xl">{tour.title}</h3>
                      <p className="mt-1.5 min-h-[34px] text-xs font-semibold leading-5 text-[#111820]/76">{tour.nights}</p>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#D98928]">{tour.price}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              {hotTours.map((tour, index) => (
                <button
                  key={tour.title}
                  type="button"
                  onClick={() => {
                    setIsAttractionResetting(false);
                    setAttractionIndex(hotTours.length + index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    attractionIndex % hotTours.length === index ? "w-7 bg-[#D98928]" : "w-1.5 bg-[#111820]/18 hover:bg-[#111820]/35"
                  }`}
                  aria-label={`Show ${tour.title}`}
                />
              ))}
            </div>

          </div>
        </section>

        {/* 4. WHY BOOK SECTION */}
        <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E8]/64 via-[#F5F1E8]/92 to-[#F5F1E8]/68" />
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#111820]/12 bg-[#F5F1E8]/78 p-5 shadow-[0_24px_70px_rgba(17,24,32,0.12)] backdrop-blur-md sm:p-8 lg:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D98928]/55 to-transparent" />
            <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:gap-12 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#D98928]/45 bg-[#D98928]/12 text-[#D98928]">
                  <Plus className="h-4 w-4" />
                </span>
                About Us
              </span>

              <h2 className="font-space fluid-title mt-6 font-bold uppercase text-[#111820]">
                Why Book with
                <span className="block text-[#D98928]">Triple R Holidays?</span>
              </h2>

              <div className="mt-8 grid gap-3">
                {whyBookItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.text}
                      className="group flex min-h-[64px] items-center gap-4 rounded-[18px] border border-[#111820]/10 bg-white/58 px-4 py-3 shadow-[0_10px_28px_rgba(17,24,32,0.05)] transition hover:-translate-y-0.5 hover:border-[#D98928]/35 hover:bg-white/78 sm:px-5"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#082B49]/8 text-[#082B49] transition group-hover:bg-[#D98928]/18 group-hover:text-[#D98928]">
                        <Icon className="h-5 w-5 stroke-[1.8]" />
                      </span>
                      <p className="text-sm font-bold leading-6 text-[#111820]/86 sm:text-[15px]">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="rounded-[24px] border border-[#111820]/12 bg-[#082B49] p-5 text-[#F5F1E8] shadow-[0_22px_56px_rgba(8,43,73,0.22)] sm:p-7 lg:p-9"
            >
              <p className="max-w-xl text-sm leading-7 text-[#F5F1E8]/84 sm:text-base sm:leading-8">
                At Triple R Holidays, we tailor every journey to your needs for a smooth and personal travel experience.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                {whyBookStats.map(stat => (
                  <div
                    key={stat.label}
                    className="rounded-[18px] border border-[#F5F1E8]/14 bg-white/8 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:p-5"
                  >
                    <p className="font-space text-3xl font-extrabold leading-none text-[#D98928] sm:text-5xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#F5F1E8]/68 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            </div>
          </div>
        </section>


        {/* 9. WHY TRAVELERS TRUST US */}
        <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E8]/60 via-[#F5F1E8]/80 to-[#F5F1E8]/60" />
          <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[#D98928]/8 blur-[100px] pointer-events-none" />
          <div className="absolute -right-24 bottom-1/4 h-56 w-56 rounded-full bg-[#082B49]/6 blur-[80px] pointer-events-none" />
          <div className="relative mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="text-center"
            >
              <h2 className="font-space fluid-title font-bold uppercase text-[#111820]">
                Trust & <span className="text-[#D98928]">Recognition</span>
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#111820]/78 sm:text-base">
                Your peace of mind is our priority. We maintain high standards of professionalism and reliability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
            >
              {/* Licensed & Registered Card */}
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="flex flex-col items-center justify-between text-center rounded-[28px] bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#111820]/08 relative overflow-hidden"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#0a2b49]/8 text-[#D98928] ring-8 ring-[#0a2b49]/35">
                    <Award className="h-10 w-10 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111820] leading-snug">
                    Licensed & Registered
                  </h3>
                  <div className="mt-2.5 h-1 w-7 rounded-full bg-[#D98928]" />
                  <p className="mt-5 text-sm leading-relaxed text-[#111820]/70">
                    Officially registered in Sri Lanka and licensed by SLTDA, ensuring trusted, compliant, and professional travel services for every journey.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#111820]/08 w-full text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111820]/04 px-3.5 py-1.5 text-xs font-semibold text-[#111820]/70">
                    BR No: P V 00359539
                  </span>
                </div>
              </motion.article>

              {/* Verified & Recommended Card */}
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="flex flex-col items-center justify-between text-center rounded-[28px] bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#111820]/08 relative overflow-hidden"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#0a2b49]/8 text-[#D98928] ring-8 ring-[#0a2b49]/35">
                    <BadgeCheck className="h-10 w-10 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111820] leading-snug">
                    Verified & Recommended
                  </h3>
                  <div className="mt-2.5 h-1 w-7 rounded-full bg-[#D98928]" />
                  <p className="mt-5 text-sm leading-relaxed text-[#111820]/70">
                    Endorsed by hundreds of happy travelers with top-rated reviews across TripAdvisor, Google, and major booking platforms.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#111820]/08 w-full text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111820]/04 px-3.5 py-1.5 text-xs font-semibold text-[#111820]/70">
                    4.8★ Rated Service
                  </span>
                </div>
              </motion.article>

              {/* Safe & Guaranteed Card */}
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="flex flex-col items-center justify-between text-center rounded-[28px] bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#111820]/08 relative overflow-hidden sm:col-span-2 lg:col-span-1"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#0a2b49]/8 text-[#D98928] ring-8 ring-[#0a2b49]/35">
                    <ShieldCheck className="h-10 w-10 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111820] leading-snug">
                    Safe & Guaranteed
                  </h3>
                  <div className="mt-2.5 h-1 w-7 rounded-full bg-[#D98928]" />
                  <p className="mt-5 text-sm leading-relaxed text-[#111820]/70">
                    100% secure payment options, encrypted data privacy, and transparent booking policies for completely worry-free travel.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#111820]/08 w-full text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111820]/04 px-3.5 py-1.5 text-xs font-semibold text-[#111820]/70">
                    24/7 On-Ground Support
                  </span>
                </div>
              </motion.article>
            </motion.div>
          </div>
        </section>

        {/* 10. Secure Payment Processing */}
        <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:py-20">
          <div className="relative mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="text-center mb-10"
            >
              <div className="flex items-center justify-center gap-3">
                <CreditCard className="h-6 w-6 text-[#D98928]" />
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#111820]">
                  Secure Payment Processing
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid gap-8 md:grid-cols-2 items-center"
            >
              {/* Left: Security badges */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
                }}
                className="space-y-4"
              >
                <div className="scandi-soft-card border border-[#111820]/14 p-5 flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2F5D50]/15 text-[#2F5D50]">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-bold text-[#111820]">100% Secure Online Payments</p>
                </div>
                <div className="scandi-soft-card border border-[#111820]/14 p-5 flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D98928]/15 text-[#D98928]">
                    <Lock className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-bold text-[#111820]">SSL Encrypted Transactions</p>
                </div>
              </motion.div>

              {/* Right: Payment methods */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 24 },
                  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
                }}
                className="text-center"
              >
                <p className="text-base font-bold text-[#111820] mb-5">We Are Accepting</p>
                <div className="flex flex-wrap items-center justify-center gap-5">
                  {/* 40% Advance Payment Badge */}
                  <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[#D98928]/30 bg-[#D98928]/10 px-4 py-3">
                    <span className="text-lg font-extrabold text-[#D98928]">50%</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#D98928]">Advance Payment</span>
                  </div>

                  <div className="flex h-14 w-20 items-center justify-center rounded-xl border border-[#111820]/10 bg-white p-2 shadow-sm">
                    <img src="/images/payment/visa.svg" alt="Visa" className="h-7 w-auto object-contain" />
                  </div>

                  <div className="flex h-14 w-20 items-center justify-center rounded-xl border border-[#111820]/10 bg-white p-2 shadow-sm">
                    <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-9 w-auto object-contain" />
                  </div>

                  <div className="flex h-14 w-20 items-center justify-center rounded-xl border border-[#111820]/10 bg-white p-2 shadow-sm">
                    <img src="/images/payment/american-express.svg" alt="American Express" className="h-10 w-auto object-contain" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 11. MEMBERSHIPS & PARTNERSHIPS */}
        <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E8]/50 via-[#F5F1E8]/75 to-[#F5F1E8]/50" />
          <div className="relative mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Handshake className="h-6 w-6 text-[#D98928]" />
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#111820]">
                  Memberships & Partnerships
                </h3>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Local Expertise */}
              <motion.article
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="scandi-soft-card border border-[#111820]/14 p-7 text-center"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#D98928]/18 text-[#D98928]">
                  <Users className="h-7 w-7" />
                </span>
                <h4 className="mt-5 font-space text-xl font-extrabold uppercase text-[#111820]">
                  Local Expertise
                </h4>
                <p className="mt-3 text-sm leading-7 text-[#111820]/75">
                  Sri Lanka&apos;s largest network of local experts
                </p>
                <span className="mt-4 inline-block rounded-full bg-[#D98928]/12 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#D98928]">
                  Trusted Collaborators
                </span>
              </motion.article>

              {/* Hotel Partners */}
              <motion.article
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="scandi-soft-card border border-[#111820]/14 p-7 text-center"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#D98928]/18 text-[#D98928]">
                  <Hotel className="h-7 w-7" />
                </span>
                <h4 className="mt-5 font-space text-xl font-extrabold uppercase text-[#111820]">
                  Hotel Partners
                </h4>
                <p className="mt-3 text-sm leading-7 text-[#111820]/75">
                  Partnerships with 500+ luxury hotels and resorts
                </p>
                <span className="mt-4 inline-block rounded-full bg-[#D98928]/12 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#D98928]">
                  Trusted Partner
                </span>
              </motion.article>

              {/* Premium Transport */}
              <motion.article
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="scandi-soft-card border border-[#111820]/14 p-7 text-center sm:col-span-2 lg:col-span-1"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#D98928]/18 text-[#D98928]">
                  <Truck className="h-7 w-7" />
                </span>
                <h4 className="mt-5 font-space text-xl font-extrabold uppercase text-[#111820]">
                  Premium Transport
                </h4>
                <p className="mt-3 text-sm leading-7 text-[#111820]/75">
                  Air-conditioned private transfers and vehicles
                </p>
                <span className="mt-4 inline-block rounded-full bg-[#D98928]/12 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#D98928]">
                  Official Travel Partner
                </span>
              </motion.article>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 text-center text-sm leading-7 text-[#111820]/68 max-w-2xl mx-auto"
            >
              We are proud members of leading travel associations and maintain partnerships with major hotels.
            </motion.p>
          </div>
        </section>

        {/* 12. EXCLUSIVE CUSTOMIZED TOUR */}
        <section id="custom-tour" className="relative overflow-hidden px-4 py-12 sm:px-6 lg:py-24 border-t border-[#111820]/10 bg-gradient-to-b from-[#F5F1E8]/30 to-[#F5F1E8]/70">
          <div className="relative mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="text-center mb-12"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D98928]">
                Looking for an
              </span>
              <h2 className="font-space text-2xl sm:text-5xl font-black uppercase mt-3 text-[#111820]">
                Exclusive Customized Tour?
              </h2>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Left column: Contact Card & Map */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 16 }}
                className="flex flex-col h-full rounded-[28px] bg-[#111820] text-white p-7 sm:p-9 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative background blur */}
                <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#D98928]/12 blur-[100px] pointer-events-none" />
                <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-[#1E7C8A]/10 blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-space text-2xl font-bold uppercase text-[#D98928] mb-3">
                      Get Expert Travel Advice
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70 mb-8 max-w-sm">
                      Planning a trip can be exciting but also overwhelming with so many options available.
                    </p>

                    {/* Direct Info */}
                    <div className="space-y-5 mb-8">
                      <a href="tel:+94776661272" className="flex items-center gap-4 group">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#D98928] group-hover:bg-[#D98928] group-hover:text-white transition-all duration-300">
                          <Phone className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-white/90 group-hover:text-[#D98928] transition">+94 (77) 666 1272</span>
                      </a>
                      <a href="mailto:hello@triplerholidays.com" className="flex items-center gap-4 group">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#D98928] group-hover:bg-[#D98928] group-hover:text-white transition-all duration-300">
                          <Mail className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-white/90 group-hover:text-[#D98928] transition break-all">hello@triplerholidays.com</span>
                      </a>
                      <div className="flex items-start gap-4">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#D98928]/20 text-[#D98928] shrink-0">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <span className="text-sm leading-relaxed text-white/80">
                          173 A 1/2 Negombo Road,<br />Wattala - Triple R Holidays,<br />Sri Lanka
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Embedded interactive Google Map */}
                  <div className="h-48 w-full rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-inner mb-6 min-h-[190px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3960.2284!2d79.88871!3d6.98235!2m3!1f0!2f0!3f0!3m2!1i1024!2i769!4f13.1!3m2!1m1!2zNsKwNTgnNTYuNSJOIDc5wrA1MyczOS4zIkU!5e0!3m2!1sen!2slk!4v1716942000000!5m2!1sen!2slk"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full object-cover"
                      title="Triple R Holidays Location Map"
                    ></iframe>
                  </div>

                  {/* Social Icons */}
                  <div className="flex gap-4">
                    <a href="https://facebook.com" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-white/80 hover:bg-[#D98928] hover:text-white transition duration-300" aria-label="Facebook">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/triplerholidays.lk" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-white/80 hover:bg-[#D98928] hover:text-white transition duration-300" aria-label="Instagram">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right column: Form Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 16 }}
                className="scandi-soft-card border border-[#111820]/14 p-7 sm:p-9 bg-[#F5F1E8]/70 backdrop-blur-md shadow-lg"
              >
                <h3 className="font-space text-2xl font-bold uppercase text-[#111820] mb-6">
                  Let&apos;s Plan Your Dream Journey
                </h3>

                <AnimatePresence mode="wait">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="h-16 w-16 rounded-full bg-[#2F5D50]/10 flex items-center justify-center text-[#2F5D50] mb-4">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h4 className="font-space text-xl font-bold uppercase text-[#111820]">Inquiry Sent!</h4>
                      <p className="mt-2 text-sm text-[#111820]/75 max-w-sm leading-relaxed">
                        Thank you for planning your journey with us. Our travel experts will get in touch with you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="mt-6 text-xs font-bold uppercase tracking-wider text-[#D98928] hover:text-[#F2B24D] transition cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setIsSubmitting(true);

                        try {
                          await sendWeb3Form("Custom Tour Inquiry - Triple R Holidays", "Homepage Custom Tour Inquiry", [
                            ["Name", customTourForm.name],
                            ["Email", customTourForm.email],
                            ["Message", customTourForm.message]
                          ]);

                          setIsSubmitting(false);
                          setSubmitSuccess(true);
                          setCustomTourForm({ name: "", email: "", message: "" });
                        } catch {
                          setIsSubmitting(false);
                          window.alert("Sorry, we could not send your inquiry. Please try again or contact us on WhatsApp.");
                        }
                      }}
                      className="space-y-5"
                    >
                      <div>
                        <label htmlFor="custom-name" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="custom-name"
                          required
                          value={customTourForm.name}
                          onChange={(e) => setCustomTourForm({ ...customTourForm, name: e.target.value })}
                          placeholder="Enter your name"
                          className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3 text-sm text-[#111820] placeholder-[#111820]/40 outline-none focus:border-[#D98928] focus:bg-white transition duration-200"
                        />
                      </div>

                      <div>
                        <label htmlFor="custom-email" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="custom-email"
                          required
                          value={customTourForm.email}
                          onChange={(e) => setCustomTourForm({ ...customTourForm, email: e.target.value })}
                          placeholder="Enter your email"
                          className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3 text-sm text-[#111820] placeholder-[#111820]/40 outline-none focus:border-[#D98928] focus:bg-white transition duration-200"
                        />
                      </div>

                      <div>
                        <label htmlFor="custom-message" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                          Message
                        </label>
                        <textarea
                          id="custom-message"
                          required
                          rows={4}
                          value={customTourForm.message}
                          onChange={(e) => setCustomTourForm({ ...customTourForm, message: e.target.value })}
                          placeholder="Describe your dream travel plan, number of passengers, dates, destinations..."
                          className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3 text-sm text-[#111820] placeholder-[#111820]/40 outline-none focus:border-[#D98928] focus:bg-white transition duration-200 resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full min-h-12 rounded-xl bg-[#111820] text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#D98928] disabled:opacity-50 transition duration-300 shadow-md shadow-[#111820]/10 cursor-pointer"
                      >
                        {isSubmitting ? "Submitting..." : (
                          <>
                            Submit Request
                            <Send className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedAttraction && (
          <motion.div
            className="fixed inset-0 z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close attraction details"
              onClick={() => setSelectedAttraction(null)}
              className="absolute inset-0 bg-[rgba(2,11,22,0.72)] backdrop-blur-xl"
            />

            <div
              className="absolute inset-0 flex items-center justify-center overscroll-contain p-4 sm:p-5"
              style={{
                paddingTop: "calc(1rem + env(safe-area-inset-top, 0px))",
                paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))"
              }}
              data-lenis-prevent
              onWheel={event => event.stopPropagation()}
              onTouchMove={event => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => openAttractionByDirection(-1)}
                aria-label="Previous top attraction"
                className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/28 bg-[#020B16]/42 text-white shadow-[0_16px_40px_rgba(2,8,23,0.32)] backdrop-blur-xl transition hover:bg-[#D98928] hover:text-[#111820] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D98928] sm:grid xl:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => openAttractionByDirection(1)}
                aria-label="Next top attraction"
                className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/28 bg-[#020B16]/42 text-white shadow-[0_16px_40px_rgba(2,8,23,0.32)] backdrop-blur-xl transition hover:bg-[#D98928] hover:text-[#111820] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D98928] sm:grid xl:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="attraction-modal-title"
                initial={{ y: 42, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 34, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 230, damping: 26 }}
                data-lenis-prevent
                onTouchStart={handleAttractionTouchStart}
                onTouchEnd={handleAttractionTouchEnd}
                onTouchCancel={() => {
                  attractionSwipeStartRef.current = null;
                }}
                className="relative grid max-h-[calc(100dvh-2rem)] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-[22px] border border-white/28 bg-[rgba(245,241,232,0.94)] shadow-[0_28px_90px_rgba(2,8,23,0.58)] backdrop-blur-2xl sm:rounded-[28px] lg:h-[min(720px,calc(100dvh-3rem))] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:overflow-hidden"
              >
                <div className="relative h-[min(48svh,360px)] min-h-[220px] overflow-hidden bg-[#082B49] sm:h-[min(52svh,430px)] sm:min-h-[300px] lg:h-full lg:min-h-0">
                  <AnimatePresence mode="sync">
                    {selectedAttraction.gallery.map((image, index) =>
                      index === attractionPhotoIndex ? (
                        <motion.img
                          key={`${selectedAttraction.title}-${image}`}
                          src={image}
                          alt={`${selectedAttraction.title} photo ${index + 1}`}
                          className="absolute inset-0 h-full w-full object-cover"
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null
                  )}
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020B16]/98 via-[#020B16]/45 to-[#020B16]/14" />
                  <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/18 bg-[#020B16]/35 px-3 py-2 backdrop-blur-md sm:left-5 sm:top-5">
                    {selectedAttraction.gallery.map((image, index) => (
                      <button
                        key={`${selectedAttraction.title}-photo-dot-${image}`}
                        type="button"
                        aria-label={`Show photo ${index + 1} for ${selectedAttraction.title}`}
                        onClick={() => setAttractionPhotoIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          attractionPhotoIndex === index ? "w-8 bg-[#D98928]" : "w-2 bg-white/60 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    aria-label="Close attraction details"
                    onClick={() => setSelectedAttraction(null)}
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/42 bg-[#020B16]/45 text-white shadow-[0_12px_30px_rgba(2,8,23,0.25)] backdrop-blur-md transition hover:bg-[#D98928] hover:text-[#111820] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D98928] sm:h-10 sm:w-10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="absolute right-4 top-16 z-10 flex items-center gap-2 sm:bottom-7 sm:right-7 sm:top-auto">
                    <span className="rounded-full border border-white/22 bg-[#020B16]/36 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {selectedAttractionIndex + 1}/{hotTours.length}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
                    <p className="inline-flex items-center gap-2 rounded-full bg-[#D98928] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#111820]">
                      <MapPin className="h-3.5 w-3.5" />
                      {selectedAttraction.price}
                    </p>
                  </div>
                </div>

                <div className="min-h-0 bg-[rgba(245,241,232,0.96)] p-4 backdrop-blur-xl sm:p-7 lg:h-full lg:overflow-y-auto" data-lenis-prevent>
                  <div className="-mx-4 -mt-4 border-b border-[#111820]/10 bg-[rgba(245,241,232,0.98)] px-4 pb-4 pt-3 backdrop-blur-xl sm:-mx-7 sm:-mt-7 sm:px-7 sm:pt-4">
                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#D98928]">
                      <MapPin className="h-4 w-4" />
                      Attraction Guide
                    </p>
                    <h4 id="attraction-modal-title" className="mt-1 font-space text-xl font-extrabold uppercase leading-tight text-[#111820] sm:text-2xl">
                      {selectedAttraction.title}
                    </h4>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-[#111820]/82 sm:text-[15px] sm:leading-8">
                    {selectedAttraction.description}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[18px] border border-[#111820]/10 bg-[rgba(255,255,255,0.78)] p-4 shadow-[0_12px_30px_rgba(17,24,32,0.05)] backdrop-blur-md">
                      <Clock3 className="h-4 w-4 text-[#D98928]" />
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#111820]/55">Best moment</p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-[#111820]">{selectedAttraction.bestTime}</p>
                    </div>
                    <div className="rounded-[18px] border border-[#111820]/10 bg-[rgba(255,255,255,0.78)] p-4 shadow-[0_12px_30px_rgba(17,24,32,0.05)] backdrop-blur-md">
                      <MapPin className="h-4 w-4 text-[#D98928]" />
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#111820]/55">Region</p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-[#111820]">{selectedAttraction.price}</p>
                    </div>
                  </div>

                  <section className="mt-5 rounded-[18px] border border-[#111820]/10 bg-[rgba(255,255,255,0.78)] p-5 shadow-[0_12px_30px_rgba(17,24,32,0.05)] backdrop-blur-md">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#111820]/55">Highlights</p>
                    <ul className="mt-3 space-y-2.5">
                      {selectedAttraction.highlights.map(highlight => (
                        <li key={highlight} className="flex items-start gap-2 text-sm leading-6 text-[#111820]/80">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D98928]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="mt-5">
                    <a
                      href="/holiday-tours"
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111820] px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#D98928] hover:text-[#111820]"
                      onClick={() => setSelectedAttraction(null)}
                    >
                      Plan This Visit
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
