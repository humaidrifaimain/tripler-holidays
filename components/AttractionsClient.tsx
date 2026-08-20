"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera, Clock3, MapPin, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

/* ───────────────────────── Attraction data ───────────────────────── */

type Attraction = {
  title: string;
  image: string;
  location: string;
  description: string;
  tags: string[];
};

const attractions: Attraction[] = [
  {
    title: "Sigiriya (Lion Rock)",
    image: "/images/attractions/home-carousel/sigiriya-rock-fortress.jpg",
    location: "Matale District, Central Province",
    description:
      "Ancient rock fortress rising 200m above the jungle, featuring stunning frescoes, mirror wall, and landscaped gardens. A UNESCO World Heritage Site and one of Asia's best-preserved ancient cities.",
    tags: ["#UNESCO", "#History", "#Must Visit"]
  },
  {
    title: "Temple of the Tooth (Kandy)",
    image: "/images/attractions/temple-of-tooth-kandy.jpg",
    location: "Kandy, Central Province",
    description:
      "Sacred Buddhist temple housing the relic of the tooth of Buddha. Set beside the beautiful Kandy Lake, this UNESCO site hosts the spectacular Esala Perahera festival annually.",
    tags: ["#Sacred", "#Culture", "#UNESCO"]
  },
  {
    title: "Nine Arches Bridge & Ella",
    image: "/images/new-pic/hero-gallery-c29f7dfb-800x450.jpeg",
    location: "Ella, Badulla District",
    description:
      "Iconic colonial-era railway bridge surrounded by lush tea plantations and misty mountains. Ella offers breathtaking hikes, stunning viewpoints, and one of the world's most scenic train rides.",
    tags: ["#Scenic", "#Hiking", "#Train Ride"]
  },
  {
    title: "Yala National Park",
    image:
      "https://images.unsplash.com/photo-1615824996195-f780bba7cfab?auto=format&fit=crop&w=900&q=82",
    location: "Southern & Uva Provinces",
    description:
      "Sri Lanka's most visited wildlife park, home to the highest density of leopards in the world. Spot elephants, sloth bears, crocodiles, and hundreds of bird species on thrilling safaris.",
    tags: ["#Wildlife", "#Safari", "#Leopards"]
  },
  {
    title: "Galle Fort",
    image: "/images/attractions/home-carousel/galle-dutch-fort.jpg",
    location: "Galle, Southern Province",
    description:
      "A UNESCO World Heritage fortification built by the Portuguese in 1588 and extensively fortified by the Dutch. Today it's a vibrant mix of colonial architecture, boutique shops, cafés, and ocean views.",
    tags: ["#Colonial", "#UNESCO", "#Coastal"]
  },
  {
    title: "Mirissa Beach & Whale Watching",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82",
    location: "Mirissa, Southern Province",
    description:
      "A crescent-shaped beach paradise and Sri Lanka's top spot for blue whale and dolphin watching. Crystal-clear waters, palm-fringed shores, and stunning sunsets make it unforgettable.",
    tags: ["#Beach", "#Whale Watching", "#Surfing"]
  },
  {
    title: "Nuwara Eliya (Little England)",
    image: "/images/attractions/nuwara-eliya-tea-plantations.jpg",
    location: "Central Province",
    description:
      "A charming hill station at 1,868m elevation, known as 'Little England' for its colonial-era bungalows and cool climate. Visit tea factories, Gregory Lake, and Horton Plains National Park.",
    tags: ["#Hill Country", "#Tea Trails", "#Cool Climate"]
  },
  {
    title: "Dambulla Cave Temple",
    image: "/images/attractions/dambulla-cave-temple.jpg",
    location: "Matale District, Central Province",
    description:
      "A spectacular complex of five caves containing over 150 Buddha statues and ancient paintings dating back to the 1st century BC. The largest and best-preserved cave temple in Sri Lanka.",
    tags: ["#Ancient", "#Buddhist", "#UNESCO"]
  },
  {
    title: "Adam's Peak (Sri Pada)",
    image: "/images/attractions/adams-peak-sri-pada.jpg",
    location: "Sabaragamuwa Province",
    description:
      "A sacred mountain at 2,243m revered by multiple religions. The pilgrimage climb through the night rewards you with one of the most spectacular sunrises on Earth and the famous 'sacred footprint' at the summit.",
    tags: ["#Pilgrimage", "#Sunrise", "#Trekking"]
  },
  {
    title: "Trincomalee",
    image: "/images/attractions/trincomalee-uppveli-beach.jpg",
    location: "Eastern Province",
    description:
      "Home to one of the world's finest natural harbors, pristine Nilaveli and Uppuveli beaches, ancient Koneswaram temple, and natural hot springs. A hidden gem on the east coast.",
    tags: ["#Beaches", "#Temple", "#East Coast"]
  },
  {
    title: "Arugam Bay",
    image: "/images/attractions/arugam-bay-beach.jpg",
    location: "Eastern Province",
    description:
      "World-renowned surf destination with consistent point breaks. Beyond surfing, explore lagoons, spot elephants, and experience the laid-back beach culture and fresh seafood.",
    tags: ["#Surfing", "#Beach Culture", "#Laid-back"]
  },
  {
    title: "Pinnawala Elephant Orphanage",
    image:
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=900&q=82",
    location: "Sabaragamuwa Province",
    description:
      "Home to the largest herd of captive elephants in the world. Watch elephants bathe in the river, see baby elephants being bottle-fed, and learn about elephant conservation efforts.",
    tags: ["#Elephants", "#Conservation", "#Family Friendly"]
  }
];

/* ───────────────────────── Animation variants ───────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 16 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 15 }
  }
};

/* ───────────────────────── Component ───────────────────────── */

export default function AttractionsClient() {
  return (
    <main className="scandi-page min-h-screen text-[#111820]">
      <SiteHeader variant="transparent" />

      {/* ── Hero Section ── */}
      <section
        className="photo-text-hero hero-mobile relative w-full overflow-hidden text-white"
        data-hero-pin
        data-hero-pin-distance="108"
      >
        <img
          src="/images/attractions/home-carousel/sigiriya-rock-fortress.jpg"
          alt="Sigiriya Rock Fortress"
          className="absolute inset-0 h-full w-full object-cover"
          data-parallax="12"
          data-hero-media
        />
        <div className="absolute inset-0 bg-[#082B49]/38" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B49]/22 via-[#082B49]/28 to-[#082B49]/48" />
        <div className="grain-overlay" />

        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl items-end justify-center px-6 pb-14 sm:px-8 sm:pb-16 lg:pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 }
              }
            }}
            className="max-w-3xl text-center"
            data-hero-content
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-[6px] border border-white/20 bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D98928]"
            >
              <Camera className="h-3.5 w-3.5" />
              Explore Sri Lanka
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-space text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(8,43,73,0.5)] mt-5"
            >
              Top Attractions{" "}
              <span className="text-[#D98928]">in Sri Lanka</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F1E8]/90 sm:text-base sm:leading-8"
            >
              From ancient rock fortresses and sacred temples to pristine beaches
              and misty highlands — discover the destinations that make Sri Lanka
              one of the world&apos;s most extraordinary islands.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mx-auto mt-6 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/80"
            >
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-[#D98928]" />
                {attractions.length} Destinations
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#D98928]" />
                Curated Collection
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Attractions Grid ── */}
      <section className="px-4 pb-16 pt-8 sm:px-6 lg:pb-24 lg:pt-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {attractions.map((attraction, index) => (
            <motion.article
              key={attraction.title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#111820]/14 bg-[#F5F1E8]/92 shadow-[0_16px_40px_rgba(17,24,32,0.12)] backdrop-blur-sm"
              style={{ willChange: "transform" }}
            >
              {/* Card Image */}
              <div className="expand-image relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading={index < 3 ? "eager" : "lazy"}
                />

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111820]/70 via-[#111820]/20 to-transparent" />

                {/* Number badge */}
                <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-[#D98928]/90 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Title overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="font-space text-xl font-bold leading-tight text-white drop-shadow-md sm:text-2xl">
                    {attraction.title}
                  </h2>
                  <div className="mt-1.5 flex items-center gap-1.5 text-white/85">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#F2B24D]" />
                    <span className="text-xs font-medium tracking-wide">
                      {attraction.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5 pt-4">
                <p className="flex-1 text-[13px] leading-[1.75] text-[#111820]/72">
                  {attraction.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {attraction.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#D98928]/25 bg-[#D98928]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#D98928]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── CTA Section ── */}
      <section className="px-4 pb-20 sm:px-6 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-[#111820]/14 bg-gradient-to-br from-[#082B49] via-[#1E7C8A] to-[#082B49] p-8 text-center shadow-[0_32px_80px_rgba(8,43,73,0.28)] sm:p-12 lg:p-16"
        >
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-[340px] w-[340px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(217,137,40,0.5) 0%, transparent 70%)"
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-[260px] w-[260px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(242,178,77,0.4) 0%, transparent 70%)"
            }}
          />
          <div className="grain-overlay rounded-[28px]" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2B24D] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Start Your Journey
            </span>

            <h2 className="font-space fluid-title mx-auto mt-6 max-w-2xl font-bold uppercase text-white">
              Plan Your{" "}
              <span className="text-[#D98928]">Sri Lanka Adventure</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70">
              Let our travel experts craft a personalised itinerary covering the
              best attractions, hotels, and transport — designed around your
              interests, pace, and budget.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/holiday-tours"
                className="premium-cta inline-flex min-h-12 items-center justify-center gap-2 px-8 text-sm font-bold uppercase tracking-wide"
              >
                Explore Tour Packages
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about#contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/25 bg-white/8 px-8 text-sm font-bold uppercase tracking-wide text-white transition duration-300 hover:bg-white hover:text-[#082B49]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
