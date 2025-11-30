import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";

export default function WebsiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
