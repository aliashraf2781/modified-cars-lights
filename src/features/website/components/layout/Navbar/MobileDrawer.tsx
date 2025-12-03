import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "../../common/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface NavLinkItem {
  name: string;
  href: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLinkItem[];
}

export default function MobileDrawer({
  isOpen,
  onClose,
  navLinks,
}: MobileDrawerProps) {
  const { i18n } = useTranslation();
  const language = i18n.language;
 

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed md:hidden inset-0 backdrop-blur-sm bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 backdrop-blur-md shadow-xl transform transition-transform duration-300 z-60 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300/40">
          <h2 className="text-lg font-semibold text-text">Menu</h2>
          <button
            onClick={onClose}
            className="text-text hover:text-text/30 duration-75 transition-all cursor-pointer"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-4 p-5">
          {navLinks.map((link) => (
            <NavLink
              end
              key={link.name}
              to={link.href}
              onClick={onClose}
              className={({ isActive }) =>
                `relative text-lg font-medium transition-all duration-300 rounded-lg px-3 py-2 ${
                  isActive
                    ? "text-text bg-linear-to-r from-red-900 shadow-lg"
                    : "text-text hover:bg-text/10 hover:shadow-md"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <LanguageSwitcher
            currentLocale={language}
            />
        </div>
      </div>
    </>
  );
}
