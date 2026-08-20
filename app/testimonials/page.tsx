import TestimonialsClient from '@/components/TestimonialsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "Testimonials — Traveler Reviews | Triple R Holidays"
  },
  description:
    "Read traveler testimonials about Triple R Holidays Sri Lanka tours, outbound holidays and travel services.",
  alternates: {
    canonical: "/testimonials"
  },
  openGraph: {
    title: "Testimonials — Traveler Reviews | Triple R Holidays",
    description:
      "Guest feedback from Triple R Holidays travelers across Sri Lanka and outbound holiday experiences.",
    url: "/testimonials"
  }
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
