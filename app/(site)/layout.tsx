import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnounceBar from "@/components/AnnounceBar";
import PageScripts from "@/components/PageScripts";
import SiteSplash from "@/components/SiteSplash";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import { getSite } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/styles.css" />
      <link rel="stylesheet" href="/css/trial-modal.css" />
      <SiteSplash />
      <AnnounceBar />
      <Header contact={site.contact} />
      {children}
      <Footer />
      <CookieBanner />
      <ScrollToTop />
      <PageScripts />
    </>
  );
}
