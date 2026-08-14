import type { Metadata } from "next";
import CooperateClient from "@/components/CooperateClient";

export const metadata: Metadata = {
  title: "Corporate Travel Partnerships",
  description:
    "Partner with Triple R Holidays for corporate travel, agency collaboration, DMC support and group travel coordination in Sri Lanka.",
  alternates: {
    canonical: "/cooperate"
  },
  openGraph: {
    title: "Corporate Travel Partnerships | Triple R Holidays",
    description:
      "B2B travel support for agencies, partners, hotels and corporate travel teams.",
    url: "/cooperate"
  }
};

export default function CooperatePage() {
  return <CooperateClient />;
}
