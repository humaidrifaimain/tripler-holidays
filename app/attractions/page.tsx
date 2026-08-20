import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Triple R Holidays Attractions",
  description: "Attractions content is now available on the Triple R Holidays homepage.",
  robots: {
    index: false,
    follow: true
  }
};

export default function AttractionsPage() {
  redirect("/");
}
