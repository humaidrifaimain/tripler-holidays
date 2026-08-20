import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Triple R Holidays | Contact",
  description: "Contact section moved to the About page.",
  robots: {
    index: false,
    follow: true
  }
};

export default function ContactPage() {
  redirect("/about#contact");
}
