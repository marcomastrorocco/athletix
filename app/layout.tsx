import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ATHLETIX — Train Like an Athlete | Brisbane Strength & Conditioning",
  description:
    "Elite strength and conditioning in Fortitude Valley, Brisbane. Small group classes, athlete programs, allied health and NDIS support.",
  icons: { icon: "/image/athlethix-logo.png" },
};

// Inline pre-hydration script: when the user has already seen the splash
// this session, mark <html> so CSS can hide the loader before React boots.
const splashSkipScript = `
try {
  if (sessionStorage.getItem('athletix.splash.seen')) {
    document.documentElement.classList.add('splash-skip');
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `.splash-skip .ax-loading{display:none!important}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: splashSkipScript }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
