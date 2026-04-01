import { Toaster } from "sonner";

export default function AdminParentLayout({ children }) {
  return (
    <>
      <Toaster position="top-right" richColors />
      {children}
    </>
  );
}
