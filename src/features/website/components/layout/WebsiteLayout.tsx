import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import ScrollToTop from "../common/ScrollToUp/ScrollToUp";
import WhatsAppButton from "../common/WhatsAppButton/WhatsAppButton";

export default function WebsiteLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-[20%] w-[300px] h-[300px] bg-red-200/20 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-gray-400/25 rounded-full blur-[150px] animate-pulse" />
      </div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}
