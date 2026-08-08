import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFab from "@/components/WhatsAppFab";
import PageLoadSkeleton from "@/components/PageLoadSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://triplerholidays.com"),
  title: "Triple R Holidays | Sri Lanka Tours & Holiday Packages",
  description:
    "Triple R Holidays creates seamless Sri Lanka tours, outbound holiday packages, hotel bookings, events, destination weddings and transportation.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Triple R Holidays | Sri Lanka Tours & Holiday Packages",
    description:
      "Triple R Holidays creates seamless Sri Lanka tours, outbound holiday packages, hotel bookings, events, destination weddings and transportation.",
    url: "https://triplerholidays.com",
    siteName: "Triple R Holidays",
    images: [
      {
        url: "/images/tripler-holidays-logo.png",
        width: 512,
        height: 512,
        alt: "Triple R Holidays logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Triple R Holidays | Sri Lanka Tours & Holiday Packages",
    description:
      "Triple R Holidays creates seamless Sri Lanka tours, outbound holiday packages, hotel bookings, events, destination weddings and transportation.",
    images: ["/images/tripler-holidays-logo.png"]
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
    sameAs: ["https://triplerholidays.com"]
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
