import type { Metadata } from "next";
import ServicesClient from "@/components/ServicesClient";

export const metadata: Metadata = {
  title: {
    absolute: "Our Services — Travel & Tour Services | Triple R Holidays"
  },
  description:
    "Travel services from Triple R Holidays: inbound tours, outbound tours, hotel bookings, conferences, events, destination weddings and transportation.",
  alternates: {
    canonical: "/services"
  },
  openGraph: {
    title: "Our Services — Travel & Tour Services | Triple R Holidays",
    description:
      "Inbound and outbound travel planning, hotel bookings, events, destination weddings and transport services.",
    url: "/services",
    images: [
      {
        url: "/images/services/core/pexels-marina-zvada-844583049-35606860.jpg",
        width: 1920,
        height: 1080,
        alt: "Sigiriya rock fortress in Sri Lanka"
      }
    ]
  }
};

export default function ServicesPage() {
  return <ServicesClient />;
}
