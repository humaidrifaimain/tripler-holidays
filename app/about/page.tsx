import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Our Travel Agency",
  description:
    "Learn about Triple R Holidays, a Wattala travel agency creating Sri Lanka tours, outbound holidays, hotel bookings and travel services.",
  alternates: {
    canonical: "/about"
  },
  openGraph: {
    title: "About Triple R Holidays",
    description:
      "Local travel expertise for Sri Lanka tours, outbound holidays and complete travel coordination.",
    url: "/about"
  }
};

export default function AboutPage() {
  return <AboutClient />;
}
