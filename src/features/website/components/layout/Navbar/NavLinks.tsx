
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  href: string;
}

export default function NavLinks({ navLinks }: { navLinks: NavLink[] }) {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.name}>
            <Link
              href={link.href}
              className={` relative font-medium text-sm tracking-wide transition-all duration-300 group ${
                isActive ? "text-text" : "text-text/70 hover:text-text"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-white/70 transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
