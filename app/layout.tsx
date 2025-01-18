import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

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
    url: "https://all-screen-six.vercel.app/",
    siteName: "AllScreen",
    images: [
      {
        url: "https://all-screen-six.vercel.app/og-image.jpg",
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
    images: ["https://all-screen-six.vercel.app/twitter-image.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="cNLfdKi1dUMVqtFY1oR1A_BbmoIN-i8jUNQdrQi-ztA"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="bg-white dark:bg-[#121212] text-[#212121] dark:text-[#BDBDBD] min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
