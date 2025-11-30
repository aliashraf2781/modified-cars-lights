import { NavLink } from "react-router-dom";

interface NavLinksProps {
  navLinks: Array<{ name: string; href: string; exact?: boolean }>;
}

export default function NavLinks({ navLinks }: NavLinksProps) {
  return (
    <div className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          end={link.exact} // هنا المفتاح
          className={({ isActive }) =>
            `text-md font-medium transition-all hover:scale-105 ${
              isActive ? "scale-120 text-white border-b-2 border-white" : "text-text/70"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}
