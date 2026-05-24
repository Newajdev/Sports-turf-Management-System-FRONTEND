
import Footer from "@/components/shared/footer";
import { Navber } from "@/components/shared/navbar";
import ScrollToTop from "@/components/shared/scroll-to-top";

export default function CommonLayout( {
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="relative flex min-h-screen bg-green-50 flex-col overflow-x-hidden">
      <Navber/>
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
