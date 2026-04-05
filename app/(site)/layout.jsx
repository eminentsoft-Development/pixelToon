import Header from "@/components/site/header";
import Footer from "@/components/site/footer";

export default function SiteLayout({ children }) {
  return (
    <div className="flex-1 h-screen overflow-y-auto">
      <Header />
      <main >{children}</main>
      <Footer />
    </div>
  );
}