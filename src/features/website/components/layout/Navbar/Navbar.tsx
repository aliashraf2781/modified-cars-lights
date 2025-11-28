
// import Image from "next/image";
import NavLinks from "./NavLinks";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

export default function Navbar() {
    const { i18n } = useTranslation();
    const lang = i18n.language;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

 const navLinks = [
   { name: lang === "ar" ? "الرئيسية" : "Home", href: `/${lang}`, exact: true },
   { name: lang === "ar" ? "من نحن" : "About", href: `/${lang}/about` },
   { name: lang === "ar" ? "اتصل بنا" : "Contact", href: `/${lang}/contact` },
 ];
   const navigate = useNavigate();
   const location = useLocation();
    const toggleLanguage = () => {
      const newLang = i18n.language === "en" ? "ar" : "en";
      const newPath = location.pathname.replace(
        `/${i18n.language}`,
        `/${newLang}`
      );
      navigate(newPath);
    };
  return (
    <>
      <nav className="fixed z-50 w-full backdrop-blur-md shadow-lg  ">
        <div className="container mx-auto px-3 md:px-0 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="relative h-[50px] w-[120px] transition-transform hover:scale-105">
              <img src="/logo.png" alt="Logo" className="object-contain" />
            </div>

            {/* Desktop Links */}
            <NavLinks navLinks={navLinks} />

            {/* language switcher */}
            <div className="hidden md:block">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {i18n.language }
              </button>{" "}
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
