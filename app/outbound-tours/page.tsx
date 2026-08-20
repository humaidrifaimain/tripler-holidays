import type { Metadata } from "next";
import OutboundToursClient from "@/components/OutboundToursClient";

export const metadata: Metadata = {
  title: {
    absolute: "Outbound Tours — Outbound Tour Packages | Triple R Holidays"
  },
  description:
    "Plan outbound holiday packages from Sri Lanka to Malaysia, Singapore, Thailand and Maldives with guided coordination from Triple R Holidays.",
  alternates: {
    canonical: "/outbound-tours"
  },
  openGraph: {
    title: "Outbound Tours — Outbound Tour Packages | Triple R Holidays",
    description:
      "International getaways from Sri Lanka with city breaks, beach escapes, family routes and hotel coordination.",
    url: "/outbound-tours",
    images: [
      {
        url: "/images/outbound-tours/pexels-nextvoyage-8213820.jpg",
        width: 1920,
        height: 1080,
        alt: "Thailand beach sunset with long-tail boats"
      }
    ]
  }
};

export default function OutboundToursPage() {
  return <OutboundToursClient />;
}
