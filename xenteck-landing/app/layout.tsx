import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xenteck.com"),
  title: {
    default: "XenTeck | AI Automation & Systems Consulting for Small Business",
    template: "%s | XenTeck",
  },
  description:
    "XenTeck builds AI-powered automation systems that respond to leads in under 6 seconds. We audit your operations, fix the leaks, and wire in automation that actually works. Free AI Systems Snapshot available.",
  keywords: [
    "AI automation consulting",
    "business automation services",
    "speed to lead automation",
    "Make.com automation agency",
    "workflow automation consulting",
    "AI systems audit",
    "small business automation",
    "lead response automation",
    "CRM automation",
    "sales automation",
    "operational efficiency consulting",
  ],
  authors: [{ name: "XenTeck", url: "https://xenteck.com" }],
  creator: "XenTeck",
  publisher: "XenTeck",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xenteck.com",
    siteName: "XenTeck",
    title: "XenTeck | AI Automation & Systems Consulting",
    description:
      "Stop losing leads to slow response times. XenTeck builds AI automation systems that respond in under 6 seconds. Get your free AI Systems Snapshot.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "XenTeck - AI Automation & Systems Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XenTeck | AI Automation That Actually Works",
    description:
      "We build automation systems that respond to leads in under 6 seconds. 78% of deals go to the first responder. Be first.",
    images: ["/og-image.png"],
    creator: "@xenteck",
  },
  alternates: {
    canonical: "https://xenteck.com",
  },
  category: "Business Services",
  classification: "AI Automation Consulting",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://xenteck.com/#organization",
      name: "XenTeck",
      url: "https://xenteck.com",
      logo: {
        "@type": "ImageObject",
        url: "https://xenteck.com/logo.png",
        width: 512,
        height: 512,
      },
      description:
        "XenTeck is an AI automation consulting firm that helps small businesses and agencies build systems that respond to leads in under 6 seconds.",
      foundingDate: "2024",
      founders: [
        {
          "@type": "Person",
          name: "Shaun Carriveau",
          jobTitle: "CEO & Co-Founder",
        },
        {
          "@type": "Person",
          name: "David Carriveau",
          jobTitle: "COO & Co-Founder",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "admin@xenteck.com",
        contactType: "sales",
        availableLanguage: "English",
      },
      sameAs: [
        "https://www.linkedin.com/company/xenteck",
        "https://twitter.com/xenteck",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://xenteck.com/#website",
      url: "https://xenteck.com",
      name: "XenTeck",
      publisher: {
        "@id": "https://xenteck.com/#organization",
      },
      description:
        "AI automation consulting for small businesses and agencies",
    },
    {
      "@type": "Service",
      "@id": "https://xenteck.com/#speed-to-lead",
      name: "Speed-to-Lead Automation",
      provider: {
        "@id": "https://xenteck.com/#organization",
      },
      description:
        "Automated lead response system that contacts prospects in under 6 seconds. Includes AI qualification, instant email/SMS, and CRM integration.",
      serviceType: "Lead Response Automation",
      areaServed: "US",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Automation Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Systems Snapshot",
              description:
                "Free audit revealing where your business is leaking time and money, with specific automation recommendations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "10-Day Sprint",
              description:
                "Focused automation build targeting your biggest operational bottleneck.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Stack Reset",
              description:
                "Complete rebuild of your tech stack to make it AI-ready and properly integrated.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://xenteck.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How fast can XenTeck's automation respond to leads?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our Speed-to-Lead system responds to new leads in under 6 seconds, including AI qualification scoring and personalized email delivery. Industry average is 42 hours.",
          },
        },
        {
          "@type": "Question",
          name: "What is an AI Systems Snapshot?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A free audit where we analyze how leads, messages, and customers flow through your business. We identify where you're leaking time and money, and show you exactly what to automate first.",
          },
        },
        {
          "@type": "Question",
          name: "What tools does XenTeck use for automation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We primarily use Make.com (formerly Integromat) for workflow automation, combined with AI models for intelligent routing and response generation. We integrate with your existing CRM, email, and business tools.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
