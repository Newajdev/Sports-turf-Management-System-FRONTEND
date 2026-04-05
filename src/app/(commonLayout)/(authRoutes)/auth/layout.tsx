import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import ScrollToTop from "@/components/shared/scroll-to-top";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen bg-green-50 flex-col overflow-x-hidden">
      <main className="flex-1">{children}</main>
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border-2 border-primary/20 opacity-100 sm:h-96 sm:w-96" />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-2 border-primary/20 opacity-100 sm:h-96 sm:w-96" />
    </div>
  );
}
