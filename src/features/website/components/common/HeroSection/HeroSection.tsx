import { BiDownArrow } from "react-icons/bi";
// import { PiMouseScrollLight } from "react-icons/pi";
import HeroVideo from "../HeroVideo/HeroVideo";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <section className="relative flex w-full h-[300px] md:min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Video */}
      <HeroVideo />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

    

      {/* scroll down */}
      <div className="absolute hidden md:flex bottom-10 z-10  flex-col items-center space-y-2">
        <span className="animate-bounce text-sm"> {lang === "ar" ? "اسحب لرؤية المزيد " : "Scroll Down"}</span>
        <BiDownArrow className="animate-bounce" />
      </div>
    </section>
  );
}
