import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "AllScreen - Découvrez et explorez vos films et séries préférés",
  description:
    "AllScreen est votre destination ultime pour explorer, découvrir et suivre vos films et séries TV préférés. Trouvez des recommandations personnalisées, des critiques et plus encore.",
  applicationName: "AllScreen",
  keywords: ["Films", "Séries", "Informations", "box-office"],
  generator: "Next.js",
  authors: [{ name: "Kevin Gauthier" }],
  creator: "Kevin Gauthier",
  publisher: "Kevin Gauthier",
  openGraph: {
    title: "AllScreen - Votre plateforme de films et séries",
    description:
      "Découvrez et explorez vos films et séries préférés sur AllScreen",
    url: "https://www.allscreen.ovh/",
    siteName: "AllScreen",
    images: [
      {
        url: "https://www.allscreen.ovh/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AllScreen - Découvrez vos films et séries préférés",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllScreen - Découvrez et explorez vos films et séries préférés",
    description: "Votre destination ultime pour les films et séries TV",
    images: ["https://www.allscreen.ovh/twitter-image.jpg"],
  },
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
  alternates: {
    canonical: "https://www.allscreen.ovh/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="icon"
          href="/allscreen.ico"
          sizes="256x256"
          type="image/x-icon"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#121212" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <main className=" bg-[#121212] text-[#BDBDBD] min-h-screen flex flex-col justify-between">
          <Analytics />
          <Header />
          <div className="grow">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
