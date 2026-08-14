import type { Metadata } from "next";
import PackageBookingClient from "@/components/PackageBookingClient";

export const metadata: Metadata = {
  title: "Sri Lanka Grand Multi-City Tour",
  description:
    "View the Sri Lanka Grand Multi-City Tour itinerary and send a booking inquiry to Triple R Holidays.",
  alternates: {
    canonical: "/package/1"
  },
  openGraph: {
    title: "Sri Lanka Grand Multi-City Tour | Triple R Holidays",
    description:
      "A Sri Lanka multi-city itinerary covering culture, highlands, wildlife and coastal travel.",
    url: "/package/1"
  }
};

export default function PackageBookingPage() {
  return <PackageBookingClient />;
}
