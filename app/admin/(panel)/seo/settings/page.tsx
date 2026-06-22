import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SeoSettingsForm from "@/components/admin/seo/SeoSettingsForm";
import { getSeoSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function SeoSettingsPage() {
  const settings = await getSeoSettings();
  return (
    <>
      <div className="admin-header">
        <div>
          <Link href="/admin/seo" className="btn ghost sm" style={{ marginBottom: 8 }}>
            <ChevronLeft size={14} /> SEO Manager
          </Link>
          <h1>Global SEO Settings</h1>
          <p>Site-wide defaults, analytics IDs and organization schema.</p>
        </div>
      </div>
      <SeoSettingsForm initial={settings} />
    </>
  );
}
