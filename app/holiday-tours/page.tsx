import type { Metadata } from "next";
import HolidayToursClient from "@/components/HolidayToursClient";

export const metadata: Metadata = {
  title: {
    absolute: "Sri Lanka Tours — Sri Lanka Tour Packages | Triple R Holidays"
  },
  description:
    "Explore Sri Lanka cultural tours, Ramayana heritage journeys, wildlife routes, highland escapes and coastal holiday packages with Triple R Holidays.",
  alternates: {
    canonical: "/holiday-tours"
  },
  openGraph: {
    title: "Sri Lanka Tours — Sri Lanka Tour Packages | Triple R Holidays",
    description:
      "Curated Sri Lanka Tour Packages across culture, wildlife, highlands, beaches and Ramayana heritage routes.",
    url: "/holiday-tours",
    images: [
      {
        url: "/images/holiday-tours/pexels-eslames1-32414014.jpg",
        width: 1920,
        height: 1080,
        alt: "Sri Lanka highland waterfall and tea country"
      }
    ]
  }
};

export default function HolidayToursPage() {
  return <HolidayToursClient />;
}
