import Header from "@/components/site/header";
import Footer from "@/components/site/footer";

export default function SiteLayout({ children }) {
  return (
    // <div className="w-screen h-screen overflow-auto">
    <div>
      <Header />
      <main >{children}</main>
      <Footer />
    </div>
  );
}