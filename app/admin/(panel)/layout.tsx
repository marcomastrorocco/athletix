import AdminNav from "@/components/admin/AdminNav";
import Toast from "@/components/admin/Toast";
import CommandPalette from "@/components/admin/CommandPalette";
import TopBar from "@/components/admin/TopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="stylesheet" href="/css/admin.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <div className="admin-shell">
        <AdminNav />
        <main className="admin-main">
          <TopBar />
          {children}
        </main>
      </div>
      <CommandPalette />
      <Toast />
    </>
  );
}
