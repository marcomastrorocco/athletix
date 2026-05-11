import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ATHLETIX — Train Like an Athlete | Brisbane Strength & Conditioning",
  description:
    "Elite strength and conditioning in Fortitude Valley, Brisbane. Small group classes, athlete programs, allied health and NDIS support.",
  icons: { icon: "/image/athlethix-logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
