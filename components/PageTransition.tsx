"use client";

import { usePathname } from "next/navigation";

// Wraps page content and re-runs a soft fade-in on every route change.
// Keyed by pathname so the subtree remounts and animates per navigation.
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
