
// import Image from "next/image";
import NavLinks from "./NavLinks";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";

export default function Navbar({ lang }: { lang: string }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { name: lang === "ar" ? "الرئيسية" : "Home", href: `/${lang}` },
    { name: lang === "ar" ? "من نحن" : "About", href: `/${lang}/about` },
    { name: lang === "ar" ? "اتصل بنا" : "Contact", href: `/${lang}/contact` },
  ];

  return (
    <>
      <nav className="fixed z-50 w-full backdrop-blur-md shadow-lg  ">
        <div className="container mx-auto px-3 md:px-0 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="relative h-[50px] w-[120px] transition-transform hover:scale-105">
              <img
                src="/logo.png"
                alt="Logo"
                className="object-contain"
              />
            </div>

            {/* Desktop Links */}
            <NavLinks navLinks={navLinks} />

            {/* language switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden text-text rounded-full hover:bg-white/10 transition-all"
            >
              <IoIosMenu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
