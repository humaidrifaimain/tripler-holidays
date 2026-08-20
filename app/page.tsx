import dynamic from "next/dynamic";
import type { Metadata } from "next";
import PageReveal from "@/components/PageReveal";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    absolute: "Home — Sri Lanka Tours & Outbound Holidays | Triple R Holidays"
  },
  description:
    "Plan Sri Lanka cultural tours, wildlife trips, highland escapes, outbound holidays, hotel bookings and destination weddings with Triple R Holidays in Wattala.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Home — Sri Lanka Tours & Outbound Holidays | Triple R Holidays",
    description:
      "Curated Sri Lanka tours, outbound holiday packages and travel services from Triple R Holidays.",
    url: "/",
    images: [
      {
        url: "/images/new-pic/aerial-view-to-north.jpg",
        width: 2048,
        height: 1365,
        alt: "Sri Lanka coastal resort and tropical landscape"
      }
    ]
  }
};

// Lazy load the heavy landing component
const TriplerHolidayLanding = dynamic(
  () => import("@/components/TriplerHolidayLanding"),
  {
    loading: () => <div className="h-screen bg-[#F5F1E8]" />,
    ssr: true
  }
);

function LandingLoader() {
  return (
    <div className="min-h-screen space-y-8 bg-[#F5F1E8] p-4">
      <div className="h-96 animate-pulse rounded-lg bg-gray-300/30" />
      <div className="space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300/20" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300/20" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <link rel="preload" href="/images/new-pic/aerial-view-to-north.jpg" as="image" type="image/jpeg" />
      <link rel="preload" href="/images/new-pic/hero-gallery-c29f7dfb-800x450.jpeg" as="image" type="image/jpeg" />
      <PageReveal />
      <Suspense fallback={<LandingLoader />}>
        <TriplerHolidayLanding />
      </Suspense>
    </>
  );
}
