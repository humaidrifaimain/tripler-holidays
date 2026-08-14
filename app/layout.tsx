import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFab from "@/components/WhatsAppFab";
import PageLoadSkeleton from "@/components/PageLoadSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://triplerholidays.com"),
  title: {
    default: "Triple R Holidays | Sri Lanka Tours & Holiday Packages",
    template: "%s | Triple R Holidays"
  },
  description:
    "Triple R Holidays is a Wattala travel agency creating Sri Lanka tours, outbound holiday packages, hotel bookings, destination weddings and transport services.",
  keywords: [
    "Sri Lanka tours",
    "Sri Lanka holiday packages",
    "Triple R Holidays",
    "travel agency Wattala",
    "outbound tours Sri Lanka",
    "hotel bookings Sri Lanka",
    "destination weddings Sri Lanka"
  ],
  authors: [{ name: "Triple R Holidays" }],
  creator: "Triple R Holidays",
  publisher: "Triple R Holidays",
  category: "Travel",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Triple R Holidays | Sri Lanka Tours & Holiday Packages",
    description:
      "Plan curated Sri Lanka tours, outbound holidays, hotel bookings, destination weddings and transport services with Triple R Holidays.",
    url: "https://triplerholidays.com",
    siteName: "Triple R Holidays",
    images: [
      {
        url: "/images/new%20pic/aerial+view+to+north.jpg",
        width: 2048,
        height: 1365,
        alt: "Sri Lanka coastal resort and tropical landscape"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Triple R Holidays | Sri Lanka Tours & Holiday Packages",
    description:
      "Plan curated Sri Lanka tours, outbound holidays, hotel bookings, destination weddings and transport services with Triple R Holidays.",
    images: ["/images/new%20pic/aerial+view+to+north.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any"
      },
      {
        url: "/favicon.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        url: "/favicon.png",
        sizes: "48x48",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    shortcut: "/favicon.ico"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

// Loading skeleton for Suspense boundaries
function SectionLoader() {
  return <div className="h-96 animate-pulse bg-gray-200/50" />;
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Triple R Holidays",
    url: "https://triplerholidays.com",
    logo: "https://triplerholidays.com/images/tripler-holidays-logo.png",
    image: "https://triplerholidays.com/images/tripler-holidays-logo.png",
    email: "hello@triplerholidays.com",
    telephone: "+94776661272",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "173 A 1/2 Negombo Road",
      addressLocality: "Wattala",
      addressCountry: "LK"
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Sri Lanka"
      },
      {
        "@type": "Place",
        name: "Malaysia, Singapore, Thailand and Maldives"
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+94776661272",
      contactType: "customer service",
      availableLanguage: ["English", "Sinhala", "Tamil"]
    },
    sameAs: ["https://www.facebook.com/triplerholidays"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Triple R Holidays",
    url: "https://triplerholidays.com",
    publisher: {
      "@type": "TravelAgency",
      name: "Triple R Holidays",
      logo: {
        "@type": "ImageObject",
        url: "https://triplerholidays.com/images/tripler-holidays-logo.png"
      }
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://triplerholidays.com/holiday-tours/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        <PageLoadSkeleton />
        <Suspense fallback={<SectionLoader />}>
          <SmoothScroll>
            {children}
            <WhatsAppFab />
            <SiteFooter />
          </SmoothScroll>
        </Suspense>
      </body>
    </html>
  );
}
