import { Toaster } from "sonner";

export default function AdminParentLayout({ children }) {
  return (
    <>
      <main>
        <Toaster position="top-right" richColors />
        {children}
      </main>
    </>
  );
}
