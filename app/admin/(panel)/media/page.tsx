import MediaLibrary from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Media Library</h1>
          <p>
            All uploaded images. Drag and drop to upload, click any image to
            copy URL, rename or delete.
          </p>
        </div>
      </div>
      <MediaLibrary />
    </>
  );
}
