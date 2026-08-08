import dynamic from "next/dynamic";
import PageReveal from "@/components/PageReveal";
import { Suspense } from "react";

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
      <link rel="preload" href="/videos/final%20video.mp4" as="video" type="video/mp4" />
      <link rel="preload" href="/images/attractions/arugam-bay-beach.jpg" as="image" type="image/jpeg" />
      <link rel="preload" href="/images/attractions/trincomalee-uppveli-beach.jpg" as="image" type="image/jpeg" />
      <PageReveal />
      <Suspense fallback={<LandingLoader />}>
        <TriplerHolidayLanding />
      </Suspense>
    </>
  );
}
