import { Anton, Inter, Barlow, Barlow_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnounceBar from "@/components/AnnounceBar";
import PageScripts from "@/components/PageScripts";
import SiteSplash from "@/components/SiteSplash";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import LeadFormEnhancer from "@/components/LeadFormEnhancer";
import PageTransition from "@/components/PageTransition";
import { getSite } from "@/lib/data";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow-condensed",
});

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();
  return (
    <div
      className={`${anton.variable} ${inter.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <link rel="stylesheet" href="/css/styles.css?v=tt-closures" />
      <link rel="stylesheet" href="/css/trial-modal.css" />
      <link rel="stylesheet" href="/css/page-transition.css" />
      <SiteSplash />
      <AnnounceBar />
      <Header contact={site.contact} header={site.header} />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <LeadFormEnhancer />
      <CookieBanner />
      <ScrollToTop />
      <PageScripts />
    </div>
  );
}
