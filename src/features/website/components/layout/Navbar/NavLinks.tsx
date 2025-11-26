import { NavLink } from "react-router-dom";

interface NavLinkItem {
  name: string;
  href: string;
}

export default function NavLinks({ navLinks }: { navLinks: NavLinkItem[] }) {
  return (
    <ul className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <li key={link.name}>
          <NavLink
            to={link.href}
            className={({ isActive }) =>
              `relative font-medium text-sm tracking-wide transition-all duration-300 group ${
                isActive ? "text-text" : "text-text/70 hover:text-text"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white/70 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
