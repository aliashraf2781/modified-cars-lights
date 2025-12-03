// import Image from "next/image";
import NavLinks from "./NavLinks";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";
import { Link } from "react-router";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { name: t("navbar.home"), href: `/${lang}`, exact: true },
    { name: t("navbar.about"), href: `/${lang}/about` },
    { name: t("navbar.contact"), href: `/${lang}/contact` },
  ];


  return (
    <>
      <nav className="fixed z-50 w-full backdrop-blur-md shadow-lg  ">
        <div className="container mx-auto px-3 md:px-0 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={`/${lang}`} className="relative h-[50px] w-[120px] transition-transform hover:scale-105">
              <img src="/logo.png" alt="Logo" className="cursor-pointer" />
            </Link>

            {/* Desktop Links */}
            <NavLinks navLinks={navLinks} />

            {/* language switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher currentLocale={lang} />
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
