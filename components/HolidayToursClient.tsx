"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  Hotel,
  Info,
  ShieldCheck,
  Sparkles,
  Star,
  TicketCheck,
  Users,
  X,
  MapPin,
  Route
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import AccordionFAQ from "@/components/AccordionFAQ";
import { sendWeb3Form } from "@/lib/web3forms";
import { useAutoSwipeSlider } from "@/components/AutoSwipeCarousel";
import rawWtiInboundPackages from "@/lib/wtiInboundPackages.json";

const contact = {
  phone: "+94 (77) 666 1272",
  whatsappHref: "https://wa.me/94776661272",
  email: "hello@triplerholidays.com"
};

type WtiInboundPackage = {
  id: number;
  name: string;
  destination: string;
  duration: string;
  tourtype: string;
  guide: string;
  description: string;
  priceIncludes: string[];
  priceExcludes: string[];
  CancellationPolicy: string[];
  itinerary: Array<{
    title: string;
    description: string;
  }>;
};

const wtiInboundPackages = rawWtiInboundPackages as WtiInboundPackage[];
const wtiInboundPackageById = new Map(wtiInboundPackages.map(pkg => [pkg.id, pkg]));

const formatPackageDuration = (duration: string) =>
  duration
    .replace(/(\d+)\s*Nights?\s*(\d+)\s*Days?/i, "$1 Nights / $2 Days")
    .replace(/(\d+)\s*Days?\s*(\d+)\s*Nights?/i, "$2 Nights / $1 Days");

const sriLankanPics = {
  hillCountry: "/images/new-pic/hero-gallery-c29f7dfb-800x450.jpeg",
  templeBuddha: "/images/srilankan-pics/cultural-exploration-buddha.jpg",
  templeRows: "/images/new-pic/Sigiriya-28.jpg",
  cityTemple: "/images/new-pic/38ac01f0-e4ac-11f0-b763-995cd5778bcc.jpg",
  beachBlue: "/images/new-pic/aerial-view-tropical-coastline-beach-islet.jpg",
  beachSunset: "/images/new-pic/The_Common_Wanderer_-2.jpg",
  luxuryCoast: "/images/new-pic/aerial-view-to-north.jpg",
  riverSafari: "/images/srilankan-pics/IMG_1254.jpg",
  wildlifeElephant: "/images/srilankan-pics/wildlife-elephants-family.jpg",
  safariRoad: "/images/new-pic/SRI-middle-rectangle-139041303303132.jpg",
  peraheraElephant: "/images/srilankan-pics/IMG_6800.jpg",
  peraheraUmbrella: "/images/srilankan-pics/IMG_7964.jpg"
};

const sriLankanPackagePics = {
  culturalDiscovery: [
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-cultural-discovery/01-cover.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-cultural-discovery/02-gallery-1.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-cultural-discovery/03-gallery-2.jpg"
  ],
  culturalEscape: [
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-cultural-escape/01-cover.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-cultural-escape/02-gallery-1.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-cultural-escape/03-gallery-2.jpg"
  ],
  hillsWildlifeSouthernCoast: [
    "/images/holiday-tours/inbound-package-pics-web/hills-wildlife-southern-coast/01-cover.jpg",
    "/images/holiday-tours/inbound-package-pics-web/hills-wildlife-southern-coast/02-gallery-1.jpg",
    "/images/holiday-tours/inbound-package-pics-web/hills-wildlife-southern-coast/03-gallery-2.webp"
  ],
  grandDiscovery: [
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-grand-discovery/01-cover.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-grand-discovery/02-gallery-1.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-grand-discovery/03-gallery-2.jpg"
  ],
  culturalHighlights: [
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-cultural-highlights/01-cover.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-cultural-highlights/02-gallery-1.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-cultural-highlights/03-gallery-2.jpg"
  ],
  cultureCoast: [
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-culture-coast/01-cover.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-culture-coast/02-gallery-1.jpg",
    "/images/holiday-tours/inbound-package-pics-web/sri-lanka-culture-coast/03-gallery-2.jpg"
  ],
  ramayanaKataragama: [
    "/images/holiday-tours/inbound-package-pics-web/ramayana-heritage-journey-kataragama/01-cover.jpg",
    "/images/holiday-tours/inbound-package-pics-web/ramayana-heritage-journey-kataragama/02-gallery-1.jpg",
    "/images/holiday-tours/inbound-package-pics-web/ramayana-heritage-journey-kataragama/03-gallery-2.jpg"
  ],
  ramayanaNorthern: [
    "/images/holiday-tours/inbound-package-pics-web/ramayana-heritage-journey-northern-sri-lanka/01-cover.jpg",
    "/images/holiday-tours/inbound-package-pics-web/ramayana-heritage-journey-northern-sri-lanka/02-gallery-1.jpg",
    "/images/holiday-tours/inbound-package-pics-web/ramayana-heritage-journey-northern-sri-lanka/03-gallery-2.jpg"
  ],
  ramayanaNortheast: [
    "/images/holiday-tours/inbound-package-pics-web/ramayana-heritage-journey-northeast-sri-lanka/01-cover.jpg",
    "/images/holiday-tours/inbound-package-pics-web/ramayana-heritage-journey-northeast-sri-lanka/02-gallery-1.jpg",
    "/images/holiday-tours/inbound-package-pics-web/ramayana-heritage-journey-northeast-sri-lanka/03-gallery-2.jpg"
  ]
};

const sriLankaHeroSlides = [
  {
    image: "/images/holiday-tours/hero/adobestock-colombo-skyline.jpeg",
    alt: "Aerial view of Colombo skyline and coastline"
  },
  {
    image: "/images/holiday-tours/hero/adobestock-elephants-wildlife.jpeg",
    alt: "Sri Lankan elephants in a green wildlife reserve"
  },
  {
    image: "/images/holiday-tours/hero/adobestock-temple-of-tooth.jpeg",
    alt: "Temple of the Sacred Tooth Relic in Kandy"
  },
  {
    image: "/images/holiday-tours/hero/adobestock-stilt-fishermen-sunset.jpeg",
    alt: "Sri Lankan stilt fishermen at sunset"
  }
];

const packageCancellationPolicy = [
  "Cancellation and refund terms vary depending on the selected tour package, hotels, transportation, activities, and other services included in the booking.",
  "The applicable cancellation policy and any related charges will be clearly communicated prior to booking confirmation.",
  "Certain services may be non-refundable and are subject to the terms and conditions of the respective service providers."
];

const inCountryPackages = [
  {
    id: 1,
    title: "Sri Lanka Cultural Discovery",
    duration: "7 Nights / 8 Days",
    route: "Anamaduwa, Habarana, Sigiriya, Dambulla, Kandy, Nuwara Eliya, Colombo",
    image: sriLankanPackagePics.culturalDiscovery[0],
    badge: "$1450 PP",
    idealFor: "Group tours and cultural explorers",
    highlights: ["Sigiriya Rock Fortress", "Dambulla Cave Temple", "Temple of the Tooth", "Polonnaruwa", "Kandy Cultural Show"],
    href: contact.whatsappHref
  },
  {
    id: 2,
    title: "Sri Lanka Cultural Escape",
    duration: "5 Nights / 6 Days",
    route: "Negombo, Habarana, Sigiriya, Kandy, Nuwara Eliya, Colombo",
    image: sriLankanPackagePics.culturalEscape[0],
    badge: "$1110 PP",
    idealFor: "Compact cultural vacations",
    highlights: ["Pinnawala Elephant Orphanage", "Sigiriya Rock Climb", "Village Tour", "Peradeniya Botanical Garden", "Colombo City Tour"],
    href: contact.whatsappHref
  },
  {
    id: 3,
    title: "Hills, Wildlife & Southern Coast",
    duration: "7 Nights / 8 Days",
    route: "Negombo, Kandy, Nuwara Eliya, Udawalawe, Bentota, Colombo",
    image: sriLankanPackagePics.hillsWildlifeSouthernCoast[0],
    badge: "$1249 PP",
    idealFor: "Hill country, wildlife and south coast routes",
    highlights: ["Pinnawala Elephant Orphanage", "Kandy Cultural Program", "Tea Factory", "Udawalawe Elephant Transit Home", "Galle Fort"],
    href: contact.whatsappHref
  },
  {
    id: 4,
    title: "Sri Lanka Grand Discovery",
    duration: "9 Nights / 10 Days",
    route: "Negombo, Habarana, Kandy, Nuwara Eliya, Ella, Mirissa, Colombo",
    image: sriLankanPackagePics.grandDiscovery[0],
    badge: "$1799 PP",
    idealFor: "Extended culture, wildlife and beach stays",
    highlights: ["Minneriya Jeep Safari", "Sigiriya Rock Fortress", "Nine Arch Bridge", "Whale Watching", "Mirissa Beach"],
    href: contact.whatsappHref
  },
  {
    id: 15,
    title: "Sri Lanka Cultural Highlights",
    duration: "3 Nights / 4 Days",
    route: "Habarana, Sigiriya, Kandy, Nuwara Eliya, Colombo",
    image: sriLankanPackagePics.culturalHighlights[0],
    badge: "$999 PP",
    idealFor: "Short cultural group tours",
    highlights: ["Minneriya Jeep Safari", "Sigiriya Rock Fortress", "Kandy Cultural Show", "Ramboda Waterfall", "Colombo City Tour"],
    href: contact.whatsappHref
  },
  {
    id: 16,
    title: "Sri Lanka Culture & Coast",
    duration: "9 Nights / 10 Days",
    route: "Negombo, Kandy, Nuwara Eliya, Ella, Mirissa, Colombo",
    image: sriLankanPackagePics.cultureCoast[0],
    badge: "$1234 PP",
    idealFor: "Iran market cultural group tours",
    highlights: ["Temple of the Tooth", "Sigiriya Rock Fortress", "Dowa Ancient Rock Temple", "Udawalawe Elephant Transit Home", "Mirissa Beach"],
    href: contact.whatsappHref
  },
  {
    id: 5,
    title: "Ramayana Heritage Journey – Kataragama",
    duration: "6 Nights / 7 Days",
    route: "Anuradhapura, Jaffna, Sigiriya, Kandy, Nuwara Eliya, Kataragama, Colombo",
    image: sriLankanPackagePics.ramayanaKataragama[0],
    badge: "INR 38,000 PP",
    idealFor: "Ramayana pilgrimage groups",
    highlights: ["Munneshwaram Temple", "Seetha Amman Temple", "Kataragama Temple", "Nallur Kandaswamy Temple", "Sigiriya Rock Fortress"],
    href: contact.whatsappHref
  },
  {
    id: 6,
    title: "Ramayana Heritage Journey – Northern Sri Lanka",
    duration: "5 Nights / 6 Days",
    route: "Anuradhapura, Trincomalee, Sigiriya, Kandy, Nuwara Eliya, Colombo",
    image: sriLankanPackagePics.ramayanaNorthern[0],
    badge: "INR 35,000 PP",
    idealFor: "Northern Ramayana pilgrimage routes",
    highlights: ["Munneshwaram Temple", "Manavari Temple", "Koneshwaram Temple", "Hanuman Temple", "Temple of the Tooth"],
    href: contact.whatsappHref
  },
  {
    id: 7,
    title: "Ramayana Heritage Journey – Northeast Sri Lanka",
    duration: "4 Nights / 5 Days",
    route: "Anuradhapura, Trincomalee, Sigiriya, Kandy, Nuwara Eliya, Colombo",
    image: sriLankanPackagePics.ramayanaNortheast[0],
    badge: "INR 33,000 PP",
    idealFor: "Short Ramayana pilgrimage groups",
    highlights: ["Munneshwaram Temple", "Manavari Temple", "Koneshwaram Temple", "Hanuman Temple", "Temple of the Tooth"],
    href: contact.whatsappHref
  }
].map(pkg => {
  const source = wtiInboundPackageById.get(pkg.id);

  return {
    ...pkg,
    title: source?.name ?? pkg.title,
    duration: source ? formatPackageDuration(source.duration) : pkg.duration,
    tourType: source?.tourtype ?? "Inbound Tour",
    guide: source?.guide ?? "",
    description: source?.description ?? pkg.highlights.join(". "),
    inclusions: source?.priceIncludes ?? [],
    exclusions: source?.priceExcludes ?? [],
    cancellationPolicy: packageCancellationPolicy,
    itinerary:
      source?.itinerary.map((day, index) => ({
        day: `Day ${index + 1}`,
        title: day.title.trim(),
        description: day.description
      })) ?? []
  };
});

type InCountryPackage = (typeof inCountryPackages)[number];

function uniqueImages(images: string[]) {
  return images.filter((image, index) => images.indexOf(image) === index).slice(0, 3);
}

const inboundPackageGalleryById: Record<number, string[]> = {
  1: sriLankanPackagePics.culturalDiscovery,
  2: sriLankanPackagePics.culturalEscape,
  3: sriLankanPackagePics.hillsWildlifeSouthernCoast,
  4: sriLankanPackagePics.grandDiscovery,
  5: sriLankanPackagePics.ramayanaKataragama,
  6: sriLankanPackagePics.ramayanaNorthern,
  7: sriLankanPackagePics.ramayanaNortheast,
  15: sriLankanPackagePics.culturalHighlights,
  16: sriLankanPackagePics.cultureCoast,
  18: [sriLankanPics.luxuryCoast, sriLankanPics.hillCountry, sriLankanPics.templeBuddha],
  19: [sriLankanPics.cityTemple, sriLankanPics.wildlifeElephant, sriLankanPics.hillCountry],
  20: [sriLankanPics.riverSafari, sriLankanPics.beachSunset, "/images/new-pic/01NUWA-IM0001-nuwara-eliya.jpeg"]
};

function getInboundPackageImages(pkg: InCountryPackage) {
  const configuredImages = inboundPackageGalleryById[pkg.id];
  if (configuredImages?.length) {
    return uniqueImages([pkg.image, ...configuredImages]);
  }

  const route = pkg.route.toLowerCase();

  if (route.includes("mirissa") || route.includes("bentota")) {
    return uniqueImages([pkg.image, sriLankanPics.beachSunset, sriLankanPics.luxuryCoast]);
  }

  if (route.includes("kataragama") || route.includes("jaffna") || route.includes("trincomalee")) {
    return uniqueImages([pkg.image, sriLankanPics.peraheraUmbrella, sriLankanPics.beachBlue]);
  }

  if (route.includes("udawalawe")) {
    return uniqueImages([pkg.image, sriLankanPics.wildlifeElephant, sriLankanPics.safariRoad]);
  }

  if (route.includes("nuwara eliya") || route.includes("ella")) {
    return uniqueImages([pkg.image, sriLankanPics.hillCountry, "/images/new-pic/01NUWA-IM0001-nuwara-eliya.jpeg"]);
  }

  return uniqueImages([pkg.image, sriLankanPics.templeBuddha, sriLankanPics.templeRows]);
}

const sriLankaInclusions = [
  { title: "Private chauffeur", icon: Car },
  { title: "Handpicked hotels", icon: Hotel },
  { title: "Flexible travel dates", icon: CalendarDays },
  { title: "On-ground support", icon: Users }
];

const sriLankaWhyBook = [
  "Deep local route planning for travel rhythm and comfort",
  "Trusted hotel network across cultural, hill and beach zones",
  "Driver-guide coordination with real-time local support",
  "Flexible options for couples, families and group departures"
];

const sriLankaGallery = [
  {
    image: "/images/attractions/home-carousel/sigiriya-rock-fortress.jpg",
    alt: "Sigiriya Rock Fortress rising above Sri Lankan forest",
    position: "center 42%"
  },
  {
    image: "/images/new-pic/hero-gallery-c29f7dfb-800x450.jpeg",
    alt: "Nine Arch Bridge in Ella surrounded by hill country greenery",
    position: "center 48%"
  },
  {
    image: "/images/attractions/home-carousel/yala-national-park.jpg",
    alt: "Sri Lankan leopard on safari in Yala National Park",
    position: "center 52%"
  },
  {
    image: "/images/attractions/home-carousel/galle-dutch-fort.jpg",
    alt: "Galle Fort coastline and ocean views in Sri Lanka",
    position: "center 52%"
  }
];

const sriLankaReviews = [
  {
    name: "Ishan + Dilki",
    text: "Our Sri Lanka route felt perfectly balanced between culture, hills and beach. Transfers were seamless."
  },
  {
    name: "Tharushi Family",
    text: "Kids loved the wildlife days and we loved the pace. Every stay and handover was properly managed."
  },
  {
    name: "Ahamed Group",
    text: "Local planning was strong from day one. We enjoyed Sri Lanka without dealing with route stress."
  }
];

const sriLankaFaqs = [
  {
    q: "Can I customize the Sri Lanka route?",
    a: "Yes. We customize the route sequence, hotel class and activities based on your preferred pace."
  },
  {
    q: "Do you provide private transport inside Sri Lanka?",
    a: "Yes. Private chauffeur transport is planned end-to-end for the full route."
  },
  {
    q: "How fast can we receive a Sri Lanka plan?",
    a: "Share travel dates and traveler count, and we will send your first route draft quickly."
  }
];

export default function HolidayToursClient() {
  const categoriesSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 3600 });
  const mobilePackagesSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 4200 });
  const reviewsSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 4000 });
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<InCountryPackage | null>(null);
  const [packageImageIndex, setPackageImageIndex] = useState(0);
  const currentHeroSlide = sriLankaHeroSlides[activeHeroSlide] ?? sriLankaHeroSlides[0];

  const [inquiryForm, setInquiryForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    travelType: "",
    travelCategory: "",
    numberOfDays: "",
    preferredActivities: "",
    additionalNotes: ""
  });
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide(index => (index + 1) % sriLankaHeroSlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setPackageImageIndex(0);
    if (!selectedPackage) return;

    const images = getInboundPackageImages(selectedPackage);
    const timer = window.setInterval(() => {
      setPackageImageIndex(index => (index + 1) % images.length);
    }, 1600);

    return () => window.clearInterval(timer);
  }, [selectedPackage]);

  const selectedPackageImages = selectedPackage ? getInboundPackageImages(selectedPackage) : [];
  const selectedPackageImage = selectedPackageImages[packageImageIndex % selectedPackageImages.length] ?? selectedPackage?.image;

  return (
    <main className="holiday-page-bg light-mode-travel min-h-screen text-[#111820] font-manrope">
      <SiteHeader variant="transparent" ctaLabel="Get Quote" ctaHref="/holiday-tours#tour-quote" />

      <section
        className="photo-text-hero hero-mobile relative w-full overflow-hidden text-white [--hero-image-brightness:0.68]"
        data-hero-pin
        data-hero-pin-distance="108"
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={currentHeroSlide.image}
            src={currentHeroSlide.image}
            alt={currentHeroSlide.alt}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            decoding="async"
            fetchPriority={activeHeroSlide === 0 ? "high" : "auto"}
            data-parallax="12"
            data-hero-media
            initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.025, filter: "blur(6px)" }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#082B49]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B49]/24 via-[#082B49]/20 to-[#082B49]/58" />
        <div className="absolute inset-x-0 bottom-0 h-[34rem] bg-gradient-to-t from-[#082B49]/95 via-[#082B49]/72 to-transparent" />

        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl items-end justify-center px-6 pb-14 sm:px-8 sm:pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl text-center"
            data-hero-content
          >
            <h1 className="font-space text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(8,43,73,0.5)]">
              Discover <span className="text-[#D98928]">Sri Lanka</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F1E8]/90 sm:text-base sm:leading-8">
              Curated island journeys across heritage cities, misty highlands, wildlife parks and sunlit coastlines.
            </p>
            <p className="mt-4 text-sm font-semibold tracking-[0.08em] text-white/90 sm:text-base">
              Culture, Wildlife, Highlands, Beaches.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tour-quote"
                className="inline-flex items-center gap-3 rounded-full bg-[#D98928] py-2 pl-6 pr-2 text-[11px] font-bold uppercase tracking-wider text-[#111820] shadow-lg transition-all duration-300 hover:bg-[#F2B24D] group"
              >
                Get a Quote
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#111820] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="in-country" className="scroll-mt-24 bg-transparent px-4 py-12 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Travel Themes Section */}
          <div id="travel-themes" className="scroll-mt-28 py-10">
            <div className="text-center mb-10">
              <h3 className="font-space text-3xl sm:text-4xl font-black uppercase text-[#111820]">
                Travel <span className="text-[#D98928]">Themes</span>
              </h3>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } }
              }}
              className="hide-scrollbar snap-carousel flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-4"
              ref={categoriesSlider.containerRef}
              {...categoriesSlider.touchHandlers}
            >
              {[
                {
                  title: "Cultural Exploration",
                  desc: "Walk through sacred cities, temple traditions and living heritage with comfortable local guidance.",
                  image: sriLankanPics.templeBuddha
                },
                {
                  title: "Wildlife Adventures",
                  desc: "Plan safari days around Sri Lanka's national parks, birdlife, elephants and big-cat territory.",
                  image: sriLankanPics.wildlifeElephant,
                  objectPos: "object-center"
                },
                {
                  title: "Beach Getaways",
                  desc: "Slow down on Sri Lankan beaches with surf towns, lagoon sunsets and easy coastal stays.",
                  image: sriLankanPics.beachBlue
                },
                {
                  title: "Luxury Retreats",
                  desc: "Shape the route around boutique stays, private transport and quieter premium experiences.",
                  image: sriLankanPics.luxuryCoast
                }
              ].map(theme => (
                <motion.article
                  key={theme.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="scandi-soft-card group min-w-[82vw] snap-start overflow-hidden border border-[#111820]/10 bg-white/40 sm:min-w-0"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={theme.image}
                      alt={theme.title}
                      style={{ objectPosition: theme.objectPos === "object-bottom" ? "bottom" : "center" }}
                      className={`h-full w-full object-cover ${theme.objectPos === "object-bottom" ? "object-bottom" : "object-center"} transition duration-700 group-hover:scale-105`}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-5 bg-white/40">
                    <h4 className="font-space text-lg font-bold uppercase text-[#111820] group-hover:text-[#D98928] transition duration-200">
                      {theme.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#111820]/75">
                      {theme.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <section className="bg-transparent px-0 py-8">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="scandi-soft-card p-6 sm:p-7"
              >
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
                  <span className="h-px w-9 bg-[#D98928]" />
                  Sri Lanka Tour Inclusions
                </span>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sriLankaInclusions.map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="holiday-card-soft p-5 text-center flex flex-col items-center">
                        <Icon className="h-6 w-6 text-[#D98928]" />
                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[#111820]/90">
                          {item.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Spacer */}
          <div className="h-16" />

          {/* Existing packages heading */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D98928]">
              <MapPin className="h-3.5 w-3.5" />
              Sri Lanka
            </span>
            <h3 className="font-space text-2xl sm:text-4xl font-black uppercase mt-2 text-[#111820]">
              POPULAR TOUR PACKAGES
            </h3>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 }
              }
            }}
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 xl:grid-cols-3"
            ref={mobilePackagesSlider.containerRef}
            {...mobilePackagesSlider.touchHandlers}
          >
            {inCountryPackages.map(pkg => (
              <motion.article
                key={pkg.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="scandi-soft-card min-w-[88vw] snap-start overflow-hidden border border-[#111820]/14 bg-white/60 md:min-w-0"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#D98928] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#111820]">
                      {pkg.duration}
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-space text-2xl font-extrabold uppercase text-[#111820]">{pkg.title}</h3>
                  <div className="mt-4 grid gap-2">
                    <div className="rounded-2xl border border-[#111820]/10 bg-white/50 p-3">
                      <CalendarDays className="h-4 w-4 text-[#D98928]" />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111820]/52">Duration</p>
                      <p className="mt-1 text-sm font-semibold text-[#111820]">{pkg.duration}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {pkg.highlights.slice(0, 3).map(detail => (
                      <li key={detail} className="flex items-start gap-2 text-sm leading-7 text-[#111820]/80">
                        <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-[#D98928]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111820] px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#D98928]"
                  >
                    Explore Package
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <a
                    href={pkg.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#111820]/18 px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-[#111820] transition hover:border-[#D98928] hover:text-[#D98928]"
                  >
                    Get Quote
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>



      <section className="bg-transparent px-4 py-12 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.article
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="scandi-soft-card p-6 sm:p-8"
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
                <span className="h-px w-9 bg-[#D98928]" />
                Why choose us
              </span>
              <h3 className="font-space fluid-title mt-4 font-bold uppercase">
                Sri Lanka Planning Expertise
              </h3>
              <div className="mt-5 space-y-3">
                {sriLankaWhyBook.map(item => (
                  <div key={item} className="flex items-start gap-3 rounded-[12px] border border-[#111820]/14 bg-black/[0.04] p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D98928]" />
                    <p className="text-sm leading-7 text-[#111820]/84">{item}</p>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="scandi-soft-card p-6 sm:p-8"
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
                <span className="h-px w-9 bg-[#D98928]" />
                Sri Lanka gallery
              </span>
              <h3 className="font-space fluid-title mt-4 font-bold uppercase">
                Island Highlights
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {sriLankaGallery.map(({ image, alt, position }) => (
                  <div key={image} className="expand-image overflow-hidden rounded-[12px] border border-white/14" data-expand-image>
                    <img
                      src={image}
                      alt={alt}
                      className="h-32 w-full object-cover md:h-36"
                      style={{ objectPosition: position }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="bg-transparent px-4 py-12 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
                <span className="h-px w-9 bg-[#D98928]" />
                Testimonials
              </span>
              <h2 className="font-space fluid-title mt-4 font-bold uppercase">
                WHAT OUR TRAVELERS SAY
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="hide-scrollbar snap-carousel mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0"
            ref={reviewsSlider.containerRef}
            {...reviewsSlider.touchHandlers}
          >
            {sriLankaReviews.map(item => (
              <motion.article
                key={item.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="scandi-soft-card min-w-[82vw] snap-start p-4 sm:min-w-0 sm:p-6"
              >
                <div className="flex items-center gap-1 text-[#D98928]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={`${item.name}-${i}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-[#111820]/78">{item.text}</p>
                <p className="font-space mt-5 text-lg font-bold uppercase">{item.name}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-transparent px-4 py-20 sm:px-6 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl rounded-[22px] border border-white/16 bg-navy-glass p-6 shadow-[0_30px_84px_rgba(2,8,23,0.46)] backdrop-blur-md text-white sm:p-8 lg:p-10"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
            <Sparkles className="h-4 w-4" />
            Sri Lanka FAQ
          </div>
          <h2 className="font-space fluid-title mt-4 font-bold uppercase">
            Before Your Sri Lanka Trip
          </h2>
          <AccordionFAQ
            items={sriLankaFaqs}
            theme="dark"
            className="mt-8"
          />
        </motion.div>
      </section>


      <section id="tour-quote" className="scroll-mt-28 bg-transparent px-4 pb-20 sm:px-6 lg:pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="mx-auto max-w-4xl rounded-[32px] border border-[#111820]/14 bg-[#F5F1E8]/70 backdrop-blur-md p-6 sm:p-10 shadow-xl text-[#111820]"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
              <span className="h-px w-9 bg-[#D98928]" />
              Tailor Your Experience
            </span>
            <h2 className="font-space text-2xl sm:text-4xl font-bold uppercase mt-3">
              Request Your Custom Itinerary
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#111820]/70">
              Our travel experts will review your request and get back to you within 24 hours.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {inquirySuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-[#D98928]/15 flex items-center justify-center text-[#D98928] mb-4">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h4 className="font-space text-2xl font-bold uppercase text-[#111820]">Request Received!</h4>
                <p className="mt-2 text-sm text-[#111820]/75 max-w-md leading-relaxed">
                  Thank you for sharing your dream travel plans with Triple R Holidays. We are already mapping out your custom itinerary and will reach out on WhatsApp/Email within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setInquirySuccess(false)}
                  className="mt-6 text-xs font-bold uppercase tracking-wider text-[#D98928] hover:text-[#F2B24D] transition cursor-pointer"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsInquirySubmitting(true);

                  try {
                    await sendWeb3Form("Sri Lanka Tour Inquiry - Triple R Holidays", "Sri Lanka Tour Inquiry", [
                      ["Full Name", inquiryForm.fullName],
                      ["Email", inquiryForm.email],
                      ["Mobile Number", inquiryForm.mobileNumber],
                      ["Travel Type", inquiryForm.travelType],
                      ["Travel Category", inquiryForm.travelCategory],
                      ["Number of Days", inquiryForm.numberOfDays],
                      ["Preferred Activities", inquiryForm.preferredActivities],
                      ["Additional Notes", inquiryForm.additionalNotes]
                    ]);

                    setIsInquirySubmitting(false);
                    setInquirySuccess(true);
                    setInquiryForm({
                      fullName: "",
                      email: "",
                      mobileNumber: "",
                      travelType: "",
                      travelCategory: "",
                      numberOfDays: "",
                      preferredActivities: "",
                      additionalNotes: ""
                    });
                  } catch {
                    setIsInquirySubmitting(false);
                    window.alert("Sorry, we could not send your inquiry. Please try again or contact us on WhatsApp.");
                  }
                }}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="inquiry-fullname" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                      Full Name<span className="text-[#D98928] ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      id="inquiry-fullname"
                      required
                      value={inquiryForm.fullName}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, fullName: e.target.value })}
                      placeholder="Full Name"
                      className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3.5 text-sm text-[#111820] placeholder-[#111820]/40 outline-none focus:border-[#D98928] focus:bg-white transition duration-200"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="inquiry-email" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                      Email Address<span className="text-[#D98928] ml-0.5">*</span>
                    </label>
                    <input
                      type="email"
                      id="inquiry-email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      placeholder="Email Address"
                      className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3.5 text-sm text-[#111820] placeholder-[#111820]/40 outline-none focus:border-[#D98928] focus:bg-white transition duration-200"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {/* Mobile Number */}
                  <div className="md:col-span-1">
                    <label htmlFor="inquiry-mobile" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                      Mobile Number<span className="text-[#D98928] ml-0.5">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center rounded-xl border border-[#111820]/15 bg-white/50 px-3 text-xs font-bold text-[#111820]/80">
                        LK +94
                      </div>
                      <input
                        type="tel"
                        id="inquiry-mobile"
                        required
                        value={inquiryForm.mobileNumber}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, mobileNumber: e.target.value })}
                        placeholder="Mobile Number"
                        className="w-full min-w-0 rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3.5 text-sm text-[#111820] placeholder-[#111820]/40 outline-none focus:border-[#D98928] focus:bg-white transition duration-200"
                      />
                    </div>
                  </div>

                  {/* Travel Type */}
                  <div>
                    <label htmlFor="inquiry-type" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                      Travel Type<span className="text-[#D98928] ml-0.5">*</span>
                    </label>
                    <select
                      id="inquiry-type"
                      required
                      value={inquiryForm.travelType}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, travelType: e.target.value })}
                      className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3.5 text-sm text-[#111820] outline-none focus:border-[#D98928] focus:bg-white transition duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">Travel Type</option>
                      <option value="Family Holiday">Family Holiday</option>
                      <option value="Honeymoon / Couple">Honeymoon / Couple</option>
                      <option value="Solo Journey">Solo Journey</option>
                      <option value="Group Tour">Group Tour</option>
                      <option value="Corporate / Incentive">Corporate / Incentive</option>
                    </select>
                  </div>

                  {/* Travel Category */}
                  <div>
                    <label htmlFor="inquiry-category" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                      Travel Category<span className="text-[#D98928] ml-0.5">*</span>
                    </label>
                    <select
                      id="inquiry-category"
                      required
                      value={inquiryForm.travelCategory}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, travelCategory: e.target.value })}
                      className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3.5 text-sm text-[#111820] outline-none focus:border-[#D98928] focus:bg-white transition duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">Travel Category</option>
                      <option value="Sri Lanka In-Country">Sri Lanka In-Country Tour</option>
                      <option value="Outbound Holiday">Outbound Holiday</option>
                      <option value="Custom Mixed Route">Custom Mixed Route</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {/* Number of Days */}
                  <div>
                    <label htmlFor="inquiry-days" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                      Number of Days
                    </label>
                    <input
                      type="number"
                      id="inquiry-days"
                      min={1}
                      value={inquiryForm.numberOfDays}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, numberOfDays: e.target.value })}
                      placeholder="Number Of Days"
                      className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3.5 text-sm text-[#111820] placeholder-[#111820]/40 outline-none focus:border-[#D98928] focus:bg-white transition duration-200"
                    />
                  </div>

                  {/* Preferred Activities */}
                  <div className="md:col-span-2">
                    <label htmlFor="inquiry-activities" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                      Preferred Activities
                    </label>
                    <select
                      id="inquiry-activities"
                      value={inquiryForm.preferredActivities}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, preferredActivities: e.target.value })}
                      className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3.5 text-sm text-[#111820] outline-none focus:border-[#D98928] focus:bg-white transition duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">Preferred Activities</option>
                      <option value="Cultural Heritage & Ancient Temples">Cultural Heritage & Ancient Temples</option>
                      <option value="Wildlife Safari & Nature Reserves">Wildlife Safari & Nature Reserves</option>
                      <option value="Beach Relaxation & Surfing">Beach Relaxation & Surfing</option>
                      <option value="Hill Country Trekking & Tea Estates">Hill Country Trekking & Tea Estates</option>
                      <option value="Adventure Sports & Water Rafting">Adventure Sports & Water Rafting</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="inquiry-notes" className="block text-xs font-bold uppercase tracking-wider text-[#111820]/80 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="inquiry-notes"
                    rows={4}
                    value={inquiryForm.additionalNotes}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, additionalNotes: e.target.value })}
                    placeholder="Additional Notes"
                    className="w-full rounded-xl border border-[#111820]/15 bg-white/50 px-4 py-3.5 text-sm text-[#111820] placeholder-[#111820]/40 outline-none focus:border-[#D98928] focus:bg-white transition duration-200 resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end">
                  <button
                    type="submit"
                    disabled={isInquirySubmitting}
                    className="w-full sm:w-auto min-h-[52px] rounded-full bg-[#111820] text-white px-8 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-[#D98928] disabled:opacity-50 transition duration-300 shadow-md shadow-[#111820]/10 cursor-pointer"
                  >
                    {isInquirySubmitting ? "Submitting..." : (
                      <>
                        Request Your Custom Itinerary
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            className="fixed inset-0 z-[85]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close package details"
              onClick={() => setSelectedPackage(null)}
              className="absolute inset-0 bg-[rgba(2,11,22,0.84)] backdrop-blur-md"
            />

            <div
              className="absolute inset-0 flex items-end justify-center px-3 pb-3 pt-12 sm:items-center sm:p-4"
              style={{
                paddingTop: "calc(1rem + env(safe-area-inset-top, 0px))",
                paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))"
              }}
            >
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 32, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 25 }}
                data-lenis-prevent
                className="relative flex max-h-[calc(100svh-1rem)] w-full max-w-md flex-col overflow-y-auto rounded-t-[26px] rounded-b-[18px] border border-white/12 bg-[#F5F1E8] shadow-[0_28px_90px_rgba(2,8,23,0.58)] sm:rounded-[28px] lg:grid lg:max-h-[min(760px,calc(100vh-2rem))] lg:max-w-6xl lg:grid-cols-[0.86fr_1.14fr] lg:overflow-hidden"
              >
                <div className="relative h-[300px] shrink-0 overflow-hidden sm:h-[360px] lg:h-auto lg:min-h-[760px]">
                  <AnimatePresence mode="sync">
                    <motion.img
                      key={selectedPackageImage}
                      src={selectedPackageImage}
                      alt={selectedPackage.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020B16]/28 via-transparent to-[#020B16]/16" />
                  <button
                    type="button"
                    aria-label="Close package details"
                    onClick={() => setSelectedPackage(null)}
                    className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-[#020B16]/42 text-white shadow-[0_12px_30px_rgba(2,8,23,0.25)] backdrop-blur-md transition hover:bg-[#D98928] hover:text-[#111820]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="bg-[#F5F1E8] p-4 sm:p-7 lg:max-h-[760px] lg:overflow-y-auto" data-lenis-prevent>
                  <div className="-mx-4 -mt-4 border-b border-[#111820]/10 bg-[#F5F1E8] px-4 pb-4 pt-3 sm:-mx-7 sm:-mt-7 sm:px-7 sm:pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D98928]">
                      Package Overview
                    </p>
                    <h4 className="mt-1 font-space text-xl font-extrabold uppercase leading-tight text-[#111820] sm:text-2xl">
                      {selectedPackage.title}
                    </h4>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#111820]/10 bg-white/70 p-4 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                      <Clock3 className="h-4 w-4 text-[#D98928]" />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111820]/55">Duration</p>
                      <p className="mt-1 text-sm font-semibold text-[#111820]">{selectedPackage.duration}</p>
                    </div>
                    <div className="rounded-2xl border border-[#111820]/10 bg-white/70 p-4 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                      <Route className="h-4 w-4 text-[#D98928]" />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111820]/55">Tour Type</p>
                      <p className="mt-1 text-sm font-semibold text-[#111820]">{selectedPackage.tourType}</p>
                    </div>
                  </div>

                  {selectedPackage.guide ? (
                    <div className="mt-3 rounded-2xl border border-[#111820]/10 bg-white/70 p-4 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#111820]/55">Guide</p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-[#111820]">{selectedPackage.guide}</p>
                    </div>
                  ) : null}

                  <section className="mt-5 rounded-2xl border border-[#111820]/10 bg-white/60 p-5 shadow-[0_12px_30px_rgba(17,24,32,0.05)]">
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111820]/55">
                      <Info className="h-4 w-4 text-[#D98928]" />
                      Details
                    </p>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-[#111820]/80">
                      {selectedPackage.description.split("\n").filter(Boolean).map(paragraph => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  {selectedPackage.inclusions.length ? (
                    <section className="mt-5 rounded-2xl border border-[#111820]/10 bg-white/70 p-5 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111820]/55">
                        <CheckCircle2 className="h-4 w-4 text-[#D98928]" />
                        Price Includes
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {selectedPackage.inclusions.map(inclusion => (
                          <li key={inclusion} className="flex items-start gap-2 text-sm leading-6 text-[#111820]/80">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D98928]" />
                            <span>{inclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {selectedPackage.exclusions.length ? (
                    <section className="mt-5 rounded-2xl border border-[#111820]/10 bg-white/70 p-5 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111820]/55">
                        <Info className="h-4 w-4 text-[#D98928]" />
                        Price Excludes
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {selectedPackage.exclusions.map(exclusion => (
                          <li key={exclusion} className="flex items-start gap-2 text-sm leading-6 text-[#111820]/80">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#111820]/45" />
                            <span>{exclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {selectedPackage.cancellationPolicy.length ? (
                    <section className="mt-5 rounded-2xl border border-[#111820]/10 bg-white/70 p-5 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111820]/55">
                        <ShieldCheck className="h-4 w-4 text-[#D98928]" />
                        Cancellation Policy
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {selectedPackage.cancellationPolicy.map(policy => (
                          <li key={policy} className="flex items-start gap-2 text-sm leading-6 text-[#111820]/80">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D98928]" />
                            <span>{policy}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {selectedPackage.itinerary.length ? (
                    <section className="mt-6">
                      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111820]/55">
                        <Route className="h-4 w-4 text-[#D98928]" />
                        Itinerary
                      </p>
                      <ol className="mt-3 space-y-3">
                        {selectedPackage.itinerary.map(day => (
                          <li key={`${selectedPackage.id}-${day.day}-${day.title}`} className="relative grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-[#111820]/10 bg-white/70 p-4 shadow-[0_12px_30px_rgba(17,24,32,0.05)]">
                            <div className="flex flex-col items-center">
                              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#D98928] text-[10px] font-extrabold text-[#111820]">
                                {day.day.replace(/\D/g, "")}
                              </span>
                              <span className="mt-2 h-full w-px bg-[#111820]/10" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D98928]">
                                {day.day}
                              </p>
                              <h4 className="mt-1 font-space text-lg font-bold uppercase leading-tight text-[#111820]">
                                {day.title}
                              </h4>
                              <div className="mt-2 space-y-2 text-sm leading-6 text-[#111820]/78">
                                {day.description.split("\n").filter(Boolean).map(line => (
                                  <p key={line}>{line}</p>
                                ))}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </section>
                  ) : null}

                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111820] px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#D98928]"
                    onClick={() => setSelectedPackage(null)}
                  >
                    Get Quote
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
