
import { HiLanguage } from "react-icons/hi2";
import { useState } from "react";

const locales = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export default function LanguageSwitcher() {
  // const pathname = usePathname();
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current locale from pathname
  const currentLocale = "ar";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-fit items-center gap-2 text-white font-medium rounded-full px-4 py-2 border hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        <HiLanguage size={20} />
        <span className="uppercase">{currentLocale}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 -right-4 left bg-white rounded-lg shadow-lg overflow-hidden min-w-[120px] z-50">
          {locales.map((locale) => (
            <button
              key={locale.code}
              // onClick={() => switchLocale(locale.code)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                currentLocale === locale.code ? "bg-red-500 font-semibold" : ""
              }`}
            >
              {locale.label}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
