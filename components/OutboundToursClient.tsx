"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Info,
  MapPin,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  TicketCheck,
  X
} from "lucide-react";
import { destinations } from "@/lib/content";
import SiteHeader from "@/components/SiteHeader";
import HolidayToursHeroShowcase from "@/components/HolidayToursHeroShowcase";
import AccordionFAQ from "@/components/AccordionFAQ";
import { sendWeb3Form } from "@/lib/web3forms";
import { useAutoSwipeSlider } from "@/components/AutoSwipeCarousel";

const contact = {
  phone: "+94 (77) 666 1272",
  whatsappHref: "https://wa.me/94767161937",
  email: "hello@triplerholidays.com"
};

const outboundPackageVoice: Record<
  string,
  {
    title: string;
    duration: string;
    teaser: string;
    location: string;
    audience: string;
    quoteStart: string;
  }
> = {
  "Kuala Lumpur": {
    title: "Malaysia - City Lights & Highland Nights",
    duration: "3 Nights 4 Days",
    teaser: "Kuala Lumpur city lights, shopping streets and cooler highland moments arranged into a smooth short-haul escape.",
    location: "Malaysia",
    audience: "Ideal for couples, friends and first-time outbound travellers",
    quoteStart: "From flexible seasonal rates"
  },
  Singapore: {
    title: "Singapore - Skyline & City Lights",
    duration: "3 Nights 4 Days",
    teaser: "A sleek city holiday with skyline views, iconic attractions, family-friendly fun and clean transfer planning.",
    location: "Singapore",
    audience: "Ideal for families, professionals and compact premium trips",
    quoteStart: "Quote on request"
  },
  Maldives: {
    title: "Maldives - Ocean Dreams & Island Escape",
    duration: "4 Nights 5 Days",
    teaser: "Blue lagoons, soft beaches and resort stays shaped for honeymoons, celebrations and quiet island rest.",
    location: "Maldives",
    audience: "Ideal for honeymooners and celebration travel",
    quoteStart: "From resort-led seasonal rates"
  },
  Thailand: {
    title: "Thailand - Night Pulse & Tropical Escape",
    duration: "4 Nights 5 Days",
    teaser: "Bangkok nights, cultural stops and Phuket island time combined with practical guidance from start to return.",
    location: "Thailand",
    audience: "Ideal for groups, young couples and fun-first departures",
    quoteStart: "Quote on request"
  }
};

const internationalPackages = destinations.map(destination => ({
  title: outboundPackageVoice[destination.city]?.title ?? destination.city,
  city: destination.city,
  location: outboundPackageVoice[destination.city]?.location ?? destination.country,
  duration: outboundPackageVoice[destination.city]?.duration ?? "4 Nights 5 Days",
  teaser:
    outboundPackageVoice[destination.city]?.teaser ??
    "Custom outbound journeys designed around your preferred travel pace.",
  audience:
    outboundPackageVoice[destination.city]?.audience ??
    "Ideal for all outbound travellers",
  quoteStart:
    outboundPackageVoice[destination.city]?.quoteStart ?? "Quote on request",
  image: destination.image,
  badge: destination.accent,
  href: contact.whatsappHref
}));

const outboundCategories = [
  {
    title: "City Lights",
    note: "Kuala Lumpur and Singapore escapes with skyline views, shopping stops and smooth transfers",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=88"
  },
  {
    title: "Ocean Dreams",
    note: "Maldives resort holidays for honeymoons, celebrations and peaceful island stays",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=88"
  },
  {
    title: "Tropical Escapes",
    note: "Thailand beach routes, island days and nightlife plans with guided coordination",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=88"
  },
  {
    title: "Highland Nights",
    note: "Short Malaysia getaways with city energy, Genting cool weather and family attractions",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88"
  }
];

const outboundWhyBook = [
  "Clear outbound planning from visa timeline to return flight",
  "Efficient city-centered routes for shorter travel windows",
  "Hotel and transfer coordination matched to your budget band",
  "Single-point WhatsApp support until your trip is complete"
];

const maldivesTourCopy = {
  pretitle: "Island Journeys",
  title: "Maldives Tours",
  description:
    "Choose the Maldives for lagoon-blue water, quiet beaches and resort stays that feel effortless from arrival to return. We match the island, room style and meal plan to your budget, travel dates and occasion, whether it is a honeymoon, family break or peaceful reset."
};

const thailandTourCollection = [
  {
    title: "Explore Bangkok",
    duration: "3 Nights 4 Days",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1800&q=88",
    details: [
      "3 nights accommodation",
      "All transfers",
      "Free travel insurance",
      "Dream World with Snow Town + lunch",
      "Dinner cruise with buffet dinner",
      "City and temple tour"
    ]
  },
  {
    title: "Bangkok & Phuket",
    duration: "4 Nights 5 Days",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1800&q=88",
    details: [
      "2 nights in Bangkok",
      "2 nights in Phuket",
      "All transfers",
      "Daily breakfast",
      "Phi Phi Island tour",
      "Siam Niramit Phuket show",
      "Dream World with Snow Town",
      "Dinner cruise with international buffet"
    ]
  }
];

const singaporeTourCollection = [
  {
    title: "Exciting Singapore",
    duration: "3 Nights 4 Days",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=88",
    details: [
      "3 nights accommodation",
      "All transfers",
      "Universal Studios Singapore",
      "Gardens by the Bay with both domes",
      "Drive-through Singapore city tour"
    ]
  },
  {
    title: "Amazing Singapore",
    duration: "4 Nights 5 Days",
    image:
      "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=2400&q=90",
    details: [
      "3 nights accommodation",
      "All transfers",
      "Universal Studios Singapore",
      "Half-day city tour",
      "Sentosa cable car",
      "Madame Tussauds with Images of Singapore",
      "Boat ride, SkyHelix and 4D Marvel",
      "Gardens by the Bay with both domes"
    ]
  },
  {
    title: "Singapore & Malaysia",
    duration: "5 Nights 6 Days",
    image:
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1800&q=88",
    details: [
      "2 nights in Singapore",
      "3 nights in Malaysia",
      "All transfers",
      "Universal Studios Singapore",
      "Singapore to Malaysia coach transfer",
      "Sunway Lagoon Theme Park",
      "Genting Highlands"
    ]
  }
];

type TourItineraryDay = {
  day: string;
  title: string;
  description: string;
};

type DetailedPackage = {
  title: string;
  duration: string;
  tourType: string;
  image: string;
  details: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
};

type OutboundPackageModal = {
  title: string;
  duration?: string;
  image: string;
  images?: string[];
  details?: string[];
  subtitle?: string;
  tourType?: string;
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: TourItineraryDay[];
};

const malaysiaTourCollection: DetailedPackage[] = [
  {
    title: "KL + Cameron Highlands Package",
    duration: "4 Days 3 Nights",
    tourType: "Daily Tour",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=88",
    details: [
      "Kuala Lumpur half-day city tour with KL Tower observation deck",
      "Cameron Highlands stay with a full-day local tour",
      "Strawberry farm, Lavender Park and Butterfly Park visits"
    ],
    inclusions: [
      "Shared accommodation in selected or similar hotels",
      "Daily breakfast at the hotel",
      "Air-conditioned vehicle transfers with an English-speaking chauffeur",
      "Kuala Lumpur 4-hour city tour including KL Tower Observation Deck",
      "Cameron Highlands visits to Strawberry farms, Lavender Park and Butterfly Park"
    ],
    exclusions: ["Tourism tax", "Midnight transfer surcharge"],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrival + Kuala Lumpur City Tour",
        description:
          "Meet at KLIA, continue with Kuala Lumpur sightseeing including KL Tower Observation Deck, then check in for an overnight stay in Kuala Lumpur."
      },
      {
        day: "Day 02",
        title: "Kuala Lumpur to Cameron Highlands",
        description:
          "After breakfast, travel to Cameron Highlands and settle in for an overnight highland stay."
      },
      {
        day: "Day 03",
        title: "Cameron Highlands Full-Day Tour",
        description:
          "Enjoy an 8-hour Cameron Highlands tour covering the Strawberry farms, Lavender Park and Butterfly Park before another overnight stay."
      },
      {
        day: "Day 04",
        title: "Departure",
        description: "Check out and transfer back to KLIA for the departure flight."
      }
    ]
  },
  {
    title: "KL + Sunway Lagoon + Genting Package",
    duration: "4 Days 3 Nights",
    tourType: "Daily Tour",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1800&q=88",
    details: [
      "Kuala Lumpur half-day city tour with KL Tower observation deck",
      "Sunway Lagoon 6 theme parks access",
      "Genting Highlands day tour with return cable car ride"
    ],
    inclusions: [
      "Shared accommodation in selected or similar hotels",
      "Daily breakfast at the hotel",
      "Air-conditioned vehicle transfers with an English-speaking chauffeur",
      "Kuala Lumpur 4-hour city tour including KL Tower Observation Deck",
      "Sunway Lagoon 6 theme park tickets",
      "Genting Highlands day tour including two-way standard gondola cable car"
    ],
    exclusions: ["Tourism tax", "Midnight transfer surcharge"],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrival + Kuala Lumpur Half-Day Tour",
        description:
          "Meet at KLIA, start with a half-day Kuala Lumpur city tour including KL Tower Observation Deck, then overnight in Kuala Lumpur."
      },
      {
        day: "Day 02",
        title: "Sunway Lagoon Theme Parks",
        description:
          "Spend the day at Sunway Lagoon with access to its six theme park zones, then return to the hotel in Kuala Lumpur."
      },
      {
        day: "Day 03",
        title: "Genting Highlands",
        description:
          "Visit Batu Caves and Genting Highlands, including a two-way standard gondola cable car ride, then overnight in Genting Highlands."
      },
      {
        day: "Day 04",
        title: "Departure",
        description: "Transfer to KLIA for the departure flight."
      }
    ]
  },
  {
    title: "Malaysia Grand Discovery",
    duration: "14 Days 13 Nights",
    tourType: "Daily Tour",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88",
    details: [
      "Kuala Lumpur city tour with Twin Towers and KL Tower access",
      "Genting Highlands with indoor and outdoor theme park entry",
      "Taman Negara, Langkawi and Kuala Selangor experiences"
    ],
    inclusions: [
      "Shared accommodation in selected or similar hotels",
      "Daily breakfast at the hotel",
      "Air-conditioned coach transfers with an English-speaking chauffeur",
      "Kuala Lumpur 8-hour city tour with Twin Towers and KL Tower tickets",
      "Genting Highlands with standard gondola cable car and theme park tickets"
    ],
    exclusions: ["Tourism tax", "Midnight transfer surcharge"],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrival in Kuala Lumpur",
        description: "Arrive at KLIA, transfer to the hotel and overnight in Kuala Lumpur."
      },
      {
        day: "Day 02",
        title: "Kuala Lumpur City Tour",
        description:
          "Take an 8-hour Kuala Lumpur city tour with Menara KL Tower experiences and overnight in Kuala Lumpur."
      },
      {
        day: "Day 03",
        title: "Genting + Indoor Theme Park",
        description:
          "Travel to Genting Highlands via Batu Caves, ride the standard gondola cable car and enjoy the indoor theme park."
      },
      {
        day: "Day 04",
        title: "Genting Outdoor Theme Park",
        description: "Spend the day at Genting's outdoor theme park and overnight in Genting Highlands."
      },
      {
        day: "Days 05-07",
        title: "Taman Negara Nature Stay",
        description:
          "Continue to Taman Negara for nature time, entry arrangements and a guided night jungle walk."
      },
      {
        day: "Day 08",
        title: "Taman Negara to Kuala Lumpur",
        description: "Return from Taman Negara to Kuala Lumpur and overnight in the city."
      },
      {
        day: "Day 09",
        title: "Fly to Langkawi",
        description: "Transfer to KLIA for the Langkawi flight, then check in and overnight in Langkawi."
      },
      {
        day: "Day 10",
        title: "Langkawi Cable Car",
        description:
          "Enjoy SkyCab, SkyDome, SkyRex, 3D Art Museum and Sky Bridge experiences in Langkawi."
      },
      {
        day: "Day 11",
        title: "Langkawi Island Hopping",
        description: "Join an island-hopping tour on a shared basis and overnight in Langkawi."
      },
      {
        day: "Day 12",
        title: "Langkawi to Kuala Lumpur",
        description:
          "Fly back to Kuala Lumpur, then visit Chinatown for food and shopping before overnighting in the city."
      },
      {
        day: "Day 13",
        title: "Kuala Selangor Evening",
        description:
          "Head to Kuala Selangor in the evening for fireflies and blue tears before returning to Kuala Lumpur."
      },
      {
        day: "Day 14",
        title: "Putrajaya + Departure",
        description: "Transfer to KLIA via Putrajaya for the departure flight."
      }
    ]
  }
];

const maldivesTourCollection = [
  {
    title: "Maldives Luxe Escape",
    subtitle: "For the Ultimate Indulgence",
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1600&q=88"
  },
  {
    title: "Maldives Explorer",
    subtitle: "For the Adventurous Soul",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=88"
  },
  {
    title: "Maldives Serenity Retreat",
    subtitle: "For Wellness & Rejuvenation",
    image:
      "https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=1600&q=88"
  },
  {
    title: "Maldives Family Fun",
    subtitle: "For All Ages",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=88"
  }
];

const outboundGallery = [
  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=84"
];

const outboundReviews = [
  {
    name: "Shenali + Team",
    text: "Our KL and Singapore plan was clear and smooth. Transfers, hotels and timing were exactly right."
  },
  {
    name: "Kasun Perera",
    text: "Maldives planning was fast and transparent. We got premium options with no confusion."
  },
  {
    name: "Minali Joseph",
    text: "Outbound support was great even during travel days. Response time on WhatsApp was excellent."
  }
];

const outboundFaqs = [
  {
    q: "Can you plan outbound trips from Sri Lanka?",
    a: "Yes. We handle outbound holiday planning including city flow, hotels and transfer coordination."
  },
  {
    q: "Do you help with visa timing guidance?",
    a: "Yes. We align your itinerary with the right timeline so travel documents can be prepared smoothly."
  },
  {
    q: "How do we start an outbound booking?",
    a: "Send dates, destination and traveller count. We then share route options and hotel tiers."
  }
];

function uniqueImages(images: string[]) {
  return images.filter((image, index) => images.indexOf(image) === index).slice(0, 3);
}

function getOutboundPackageImages(pkg: OutboundPackageModal) {
  if (pkg.images?.length) {
    return uniqueImages([pkg.image, ...pkg.images]);
  }

  const packageGalleries: Record<string, string[]> = {
    "KL + Cameron Highlands Package": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=88"
    ],
    "KL + Sunway Lagoon + Genting Package": [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=88"
    ],
    "Malaysia Grand Discovery": [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=88"
    ],
    "Explore Bangkok": [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1800&q=88"
    ],
    "Bangkok & Phuket": [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=88"
    ],
    "Exciting Singapore": [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=2400&q=90",
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1800&q=88"
    ],
    "Amazing Singapore": [
      "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=2400&q=90",
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1800&q=88"
    ],
    "Singapore & Malaysia": [
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1800&q=88"
    ],
    "Maldives Luxe Escape": [
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=1600&q=88"
    ],
    "Maldives Explorer": [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1600&q=88"
    ],
    "Maldives Serenity Retreat": [
      "https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=88"
    ],
    "Maldives Family Fun": [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1600&q=88"
    ]
  };

  const configuredImages = packageGalleries[pkg.title];
  if (configuredImages?.length) {
    return uniqueImages([pkg.image, ...configuredImages]);
  }

  const title = pkg.title.toLowerCase();

  if (title.includes("singapore")) {
    return uniqueImages([
      pkg.image,
      "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=2400&q=90",
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1800&q=88"
    ]);
  }

  if (title.includes("bangkok") || title.includes("phuket") || title.includes("thailand")) {
    return uniqueImages([
      pkg.image,
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1800&q=88"
    ]);
  }

  if (title.includes("maldives")) {
    return uniqueImages([
      pkg.image,
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1600&q=88"
    ]);
  }

  return uniqueImages([
    pkg.image,
    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1800&q=88",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88"
  ]);
}

export default function OutboundToursClient() {
  const destinationsSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 3500 });
  const packagesSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 3700 });
  const servicesSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 3900 });
  const topDestinationsSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 3600 });
  const popularPackagesSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 3800 });
  const whyChooseSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 4000 });

  const [inquiryForm, setInquiryForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    travelType: "",
    travelCategory: "Outbound Holiday",
    numberOfDays: "",
    preferredActivities: "",
    additionalNotes: ""
  });
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [mobilePackageModal, setMobilePackageModal] = useState<OutboundPackageModal | null>(null);
  const [packageImageIndex, setPackageImageIndex] = useState(0);

  useEffect(() => {
    if (!mobilePackageModal) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalLeft = document.body.style.left;
    const originalRight = document.body.style.right;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.left = originalLeft;
      document.body.style.right = originalRight;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
    };
  }, [mobilePackageModal]);

  useEffect(() => {
    setPackageImageIndex(0);
    if (!mobilePackageModal) return;

    const images = getOutboundPackageImages(mobilePackageModal);
    const timer = window.setInterval(() => {
      setPackageImageIndex(index => (index + 1) % images.length);
    }, 1600);

    return () => window.clearInterval(timer);
  }, [mobilePackageModal]);

  const mobilePackageImages = mobilePackageModal ? getOutboundPackageImages(mobilePackageModal) : [];
  const mobilePackageImage = mobilePackageImages[packageImageIndex % mobilePackageImages.length] ?? mobilePackageModal?.image;

  return (
    <main className="holiday-page-bg light-mode-travel min-h-screen text-[#111820] font-manrope">
      <SiteHeader variant="transparent" ctaLabel="Enquire Now" ctaHref="/outbound-tours#outbound-quote" />
      <HolidayToursHeroShowcase />

      {/* Travel Styles */}
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
                Outbound travels
              </span>
              <h2 className="font-space fluid-title mt-4 font-bold uppercase">
                Outbound Travel Themes
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
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-4"
            ref={destinationsSlider.containerRef}
            {...destinationsSlider.touchHandlers}
          >
            {outboundCategories.map(item => (
              <motion.article
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="scandi-soft-card group min-w-[88vw] snap-start overflow-hidden md:min-w-0"
              >
                <div className="expand-image relative h-52 overflow-hidden" data-expand-image>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111820]/92 via-[#111820]/20 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-space text-2xl font-bold uppercase">{item.title}</h3>
                  <p className="mt-2 text-sm scandi-text-muted">{item.note}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Malaysia Tours Block */}
      <section id="malaysia-packages" className="scroll-mt-24 bg-transparent px-4 py-12 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
              <MapPin className="h-3.5 w-3.5" />
              Malaysia
            </span>
            <h2 className="font-space fluid-title mt-4 font-bold uppercase text-[#111820]">
              Malaysia Packages
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#111820]/76 sm:text-base">
              Malaysia plans shaped around Kuala Lumpur city lights, Genting highland air, shopping time and family-friendly attractions, with transfers arranged clearly from arrival to return.
            </p>
          </motion.div>

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
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 xl:grid-cols-3"
            ref={packagesSlider.containerRef}
            {...packagesSlider.touchHandlers}
          >
            {malaysiaTourCollection.map(item => (
              <motion.article
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="scandi-soft-card min-w-[88vw] snap-start overflow-hidden border border-[#111820]/14 bg-white/60 md:min-w-0"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#D98928] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#111820]">
                      {item.duration}
                    </span>
                    <span className="rounded-full bg-white/88 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#111820]">
                      {item.tourType}
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-space text-2xl font-extrabold uppercase text-[#111820]">{item.title}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border border-[#111820]/10 bg-white/50 p-3">
                      <CalendarDays className="h-4 w-4 text-[#D98928]" />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111820]/52">Duration</p>
                      <p className="mt-1 text-sm font-semibold text-[#111820]">{item.duration}</p>
                    </div>
                    <div className="rounded-2xl border border-[#111820]/10 bg-white/50 p-3">
                      <TicketCheck className="h-4 w-4 text-[#D98928]" />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111820]/52">Tour Type</p>
                      <p className="mt-1 text-sm font-semibold text-[#111820]">{item.tourType}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {item.details.map(detail => (
                      <li key={detail} className="flex items-start gap-2 text-sm leading-7 text-[#111820]/80">
                        <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-[#D98928]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() =>
                      setMobilePackageModal({
                        title: item.title,
                        duration: item.duration,
                        image: item.image,
                        details: item.details,
                        tourType: item.tourType,
                        inclusions: item.inclusions,
                        exclusions: item.exclusions,
                        itinerary: item.itinerary
                      })
                    }
                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111820] px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#D98928]"
                  >
                    Explore Package
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <a
                    href={contact.whatsappHref}
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

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-8 max-w-3xl text-center text-sm leading-8 text-[#111820]/78 sm:text-base"
          >
            Prefer a slower pace, extra shopping time or a different hotel style? We can tailor your Malaysia holiday around your dates, budget and travel rhythm.
          </motion.p>
        </div>
      </section>

      {/* Thailand Tours Block */}
      <section id="thailand-packages" className="scroll-mt-24 bg-transparent px-4 py-12 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
              <MapPin className="h-3.5 w-3.5" />
              Thailand
            </span>
            <h2 className="font-space fluid-title mt-4 font-bold uppercase text-[#111820]">
              Bangkok + Phuket Packages
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#111820]/76 sm:text-base">
              Thailand holidays that balance Bangkok's night energy with Phuket's tropical coastline, curated activities and dependable support throughout the trip.
            </p>
          </motion.div>

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
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0"
            ref={servicesSlider.containerRef}
            {...servicesSlider.touchHandlers}
          >
            {thailandTourCollection.map(item => (
              <motion.article
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="scandi-soft-card min-w-[88vw] snap-start overflow-hidden border border-[#111820]/14 bg-white/60 md:min-w-0"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#D98928] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#111820]">
                    {item.duration}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-space text-2xl font-extrabold uppercase text-[#111820]">{item.title}</h3>
                  <button
                    type="button"
                    onClick={() =>
                      setMobilePackageModal({
                        title: item.title,
                        duration: item.duration,
                        image: item.image,
                        details: item.details
                      })
                    }
                    className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#111820] px-5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#D98928] md:hidden"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <ul className="mt-4 hidden space-y-2 md:block">
                    {item.details.map(detail => (
                      <li key={detail} className="flex items-start gap-2 text-sm leading-7 text-[#111820]/80">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D98928]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 hidden min-h-11 items-center justify-center gap-2 rounded-full bg-[#111820] px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#D98928] md:inline-flex"
                  >
                    Get Quote
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-8 max-w-3xl text-center text-sm leading-8 text-[#111820]/78 sm:text-base"
          >
            We can also adjust the route for nightlife, beaches, shopping, family attractions or a quieter resort pace.
          </motion.p>
        </div>
      </section>

      {/* Singapore Tours Block */}
      <section id="singapore-packages" className="scroll-mt-24 bg-transparent px-4 py-12 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
              <MapPin className="h-3.5 w-3.5" />
              Singapore
            </span>
            <h2 className="font-space fluid-title mt-4 font-bold uppercase text-[#111820]">
              Singapore Package Collection
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#111820]/76 sm:text-base">
              Singapore packages built for clean city movement, skyline highlights, Sentosa fun and family-friendly attractions without rushed travel days.
            </p>
          </motion.div>

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
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 xl:grid-cols-3"
            ref={topDestinationsSlider.containerRef}
            {...topDestinationsSlider.touchHandlers}
          >
            {singaporeTourCollection.map(item => (
              <motion.article
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="scandi-soft-card min-w-[88vw] snap-start overflow-hidden border border-[#111820]/14 bg-white/60 md:min-w-0"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#D98928] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#111820]">
                    {item.duration}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-space text-2xl font-extrabold uppercase text-[#111820]">{item.title}</h3>
                  <button
                    type="button"
                    onClick={() =>
                      setMobilePackageModal({
                        title: item.title,
                        duration: item.duration,
                        image: item.image,
                        details: item.details
                      })
                    }
                    className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#111820] px-5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#D98928] md:hidden"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <ul className="mt-4 hidden space-y-2 md:block">
                    {item.details.map(detail => (
                      <li key={detail} className="flex items-start gap-2 text-sm leading-7 text-[#111820]/80">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D98928]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 hidden min-h-11 items-center justify-center gap-2 rounded-full bg-[#111820] px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#D98928] md:inline-flex"
                  >
                    Get Quote
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-8 max-w-3xl text-center text-sm leading-8 text-[#111820]/78 sm:text-base"
          >
            Your Singapore plan can be tuned for theme parks, shopping, premium hotels, business travel or a compact family break.
          </motion.p>
        </div>
      </section>

      {/* Maldives Tours Block */}
      <section id="maldives-packages" className="scroll-mt-24 bg-transparent px-4 py-12 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
              <MapPin className="h-3.5 w-3.5" />
              Maldives
            </span>
            <h2 className="font-space fluid-title mt-4 font-bold uppercase text-[#111820]">
              {maldivesTourCopy.title}
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#111820]/76 sm:text-base">
              {maldivesTourCopy.description}
            </p>
          </motion.div>

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
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-4"
            ref={popularPackagesSlider.containerRef}
            {...popularPackagesSlider.touchHandlers}
          >
            {maldivesTourCollection.map(item => (
              <motion.article
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="scandi-soft-card min-w-[88vw] snap-start overflow-hidden border border-[#111820]/14 bg-white/60 md:min-w-0"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-space text-xl font-extrabold uppercase text-[#111820]">{item.title}</h3>
                  <p className="mt-2 hidden text-sm leading-7 text-[#111820]/72 md:block">{item.subtitle}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setMobilePackageModal({
                        title: item.title,
                        image: item.image,
                        subtitle: item.subtitle
                      })
                    }
                    className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#111820] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#D98928] md:hidden"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.15 }}
            className="mt-10 text-center"
          >
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#111820] px-8 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#D98928]"
            >
              Get Maldives Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Expertise & Gallery */}
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
                Outbound Trip Delivery, End To End
              </h3>
              <div className="mt-5 space-y-3">
                {outboundWhyBook.map(item => (
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
                Outbound gallery
              </span>
              <h3 className="font-space fluid-title mt-4 font-bold uppercase">
                International Tour Highlights
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {outboundGallery.map(image => (
                  <div key={image} className="expand-image overflow-hidden rounded-[12px] border border-white/14" data-expand-image>
                    <img
                      src={image}
                      alt="Outbound travel scene"
                      className="h-32 w-full object-cover md:h-36"
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

      {/* Testimonials */}
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
                Reviews
              </span>
              <h2 className="font-space fluid-title mt-4 font-bold uppercase">
                What Travellers Say
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
            className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0"
            ref={whyChooseSlider.containerRef}
            {...whyChooseSlider.touchHandlers}
          >
            {outboundReviews.map(item => (
              <motion.article
                key={item.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="scandi-soft-card min-w-[88vw] snap-start p-4 md:min-w-0 md:p-6"
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

      {/* Outbound FAQ Section */}
      <section className="bg-transparent px-4 py-12 sm:px-6 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl rounded-[22px] border border-white/16 bg-navy-glass p-6 shadow-[0_30px_84px_rgba(2,8,23,0.46)] backdrop-blur-md text-white sm:p-8 lg:p-10"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
            <Sparkles className="h-4 w-4" />
            Outbound FAQ
          </div>
          <h2 className="font-space fluid-title mt-4 font-bold uppercase">
            Before Your Outbound Trip
          </h2>
          <AccordionFAQ
            items={outboundFaqs}
            theme="dark"
            className="mt-8"
          />
        </motion.div>
      </section>

      {/* Inquiry Form */}
      <section id="outbound-quote" className="scroll-mt-28 bg-transparent px-4 pb-20 sm:px-6 lg:pb-24">
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
                    await sendWeb3Form("Outbound Holiday Inquiry - Triple R Holidays", "Outbound Holiday Inquiry", [
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
                      travelCategory: "Outbound Holiday",
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
                      <option value="Outbound Holiday">Outbound Holiday</option>
                      <option value="Sri Lanka In-Country">Sri Lanka In-Country Tour</option>
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

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isInquirySubmitting}
                    className="min-h-12 rounded-full bg-[#111820] text-white px-8 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-[#D98928] disabled:opacity-50 transition duration-300 shadow-md shadow-[#111820]/10 cursor-pointer"
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
        {mobilePackageModal && (
          <motion.div
            className="fixed inset-0 z-[85]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close package details"
              onClick={() => setMobilePackageModal(null)}
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
                className="relative flex max-h-[calc(100svh-1rem)] w-full max-w-md flex-col overflow-y-auto rounded-t-[26px] rounded-b-[18px] border border-white/12 bg-[#F5F1E8] shadow-[0_28px_90px_rgba(2,8,23,0.58)] sm:rounded-[28px] lg:grid lg:max-h-[min(720px,calc(100vh-2rem))] lg:max-w-6xl lg:grid-cols-[0.86fr_1.14fr] lg:overflow-hidden"
              >
              <div className="relative h-[300px] shrink-0 overflow-hidden sm:h-[360px] lg:h-auto lg:min-h-[720px]">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={mobilePackageImage}
                    src={mobilePackageImage}
                    alt={mobilePackageModal.title}
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
                  onClick={() => setMobilePackageModal(null)}
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-[#020B16]/42 text-white shadow-[0_12px_30px_rgba(2,8,23,0.25)] backdrop-blur-md transition hover:bg-[#D98928] hover:text-[#111820]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="bg-[#F5F1E8] p-4 sm:p-7 lg:max-h-[720px] lg:overflow-y-auto" data-lenis-prevent>
                <div className="-mx-4 -mt-4 border-b border-[#111820]/10 bg-[#F5F1E8] px-4 pb-4 pt-3 sm:-mx-7 sm:-mt-7 sm:px-7 sm:pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D98928]">
                    Package Overview
                  </p>
                  <h4 className="mt-1 font-space text-xl font-extrabold uppercase leading-tight text-[#111820] sm:text-2xl">
                    {mobilePackageModal.title}
                  </h4>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#111820]/10 bg-white/70 p-4 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                    <Clock3 className="h-4 w-4 text-[#D98928]" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111820]/55">Duration</p>
                    <p className="mt-1 text-sm font-semibold text-[#111820]">{mobilePackageModal.duration}</p>
                  </div>
                  <div className="rounded-2xl border border-[#111820]/10 bg-white/70 p-4 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                    <TicketCheck className="h-4 w-4 text-[#D98928]" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111820]/55">Tour Type</p>
                    <p className="mt-1 text-sm font-semibold text-[#111820]">{mobilePackageModal.tourType}</p>
                  </div>
                  <div className="rounded-2xl border border-[#111820]/10 bg-white/70 p-4 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                    <Route className="h-4 w-4 text-[#D98928]" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111820]/55">Route</p>
                    <p className="mt-1 text-sm font-semibold text-[#111820]">Malaysia</p>
                  </div>
                </div>

                {mobilePackageModal.details?.length ? (
                  <ul className="mt-5 space-y-2 rounded-2xl border border-[#111820]/10 bg-white/55 p-4">
                    {mobilePackageModal.details.map(detail => (
                      <li key={detail} className="flex items-start gap-2 text-sm leading-7 text-[#111820]/82">
                        <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-[#D98928]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm leading-7 text-[#111820]/78">
                    {mobilePackageModal.subtitle}
                  </p>
                )}

                {mobilePackageModal.inclusions?.length ? (
                  <section className="mt-5 rounded-2xl border border-[#111820]/10 bg-white/70 p-5 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111820]/55">
                      <CheckCircle2 className="h-4 w-4 text-[#D98928]" />
                      Tour Inclusions
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {mobilePackageModal.inclusions.map(inclusion => (
                        <li key={inclusion} className="flex items-start gap-2 text-sm leading-6 text-[#111820]/80">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D98928]" />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {mobilePackageModal.exclusions?.length ? (
                  <section className="mt-5 rounded-2xl border border-[#111820]/10 bg-white/70 p-5 shadow-[0_12px_30px_rgba(17,24,32,0.06)]">
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111820]/55">
                      <Info className="h-4 w-4 text-[#D98928]" />
                      Exclusions
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#111820]/80">
                      {mobilePackageModal.exclusions.join(", ")}
                    </p>
                  </section>
                ) : null}

                {mobilePackageModal.itinerary?.length ? (
                  <section className="mt-6">
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111820]/55">
                      <Route className="h-4 w-4 text-[#D98928]" />
                      Itinerary
                    </p>
                    <ol className="mt-3 space-y-3">
                      {mobilePackageModal.itinerary.map(day => (
                        <li key={`${mobilePackageModal.title}-${day.day}`} className="relative grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-[#111820]/10 bg-white/70 p-4 shadow-[0_12px_30px_rgba(17,24,32,0.05)]">
                          <div className="flex flex-col items-center">
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#D98928] text-[10px] font-extrabold text-[#111820]">
                              {day.day.replace(/\D/g, "") || "•"}
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
                            <p className="mt-2 text-sm leading-6 text-[#111820]/78">{day.description}</p>
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
                  onClick={() => setMobilePackageModal(null)}
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
