import { useTranslation } from "react-i18next";

export default function BrandingSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl text-text font-bold mb-4">
          {lang === "ar"
            ? "طور شكل عربيتك - خلي فوانيسك تتكلم عنك!"
            : "Mod Your Ride – Unleash Your Car’s True Potential!"}
        </h2>

        <p className="text-text/80 max-w-4xl text-lg leading-relaxed">
          {lang === "ar"
            ? "متخصصون في تعديل فوانيس السيارات باحترافية عالية. بنحوّل الإضاءة العادية لإضاءة LED و زينون أقوى، أوفّر، وأجمل. بنشتغل على تحسين الرؤية الليلية، زيادة أمان السواقة، وكمان ندي عربيتك شكل مختلف ومميز عن باقي العربيات. لو نفسك في ستايل رياضي أو إضاءة عصرية، إحنا هنا علشان نحقق لك اللي نفسك فيه بأعلى جودة وخامات أصلية."
            : "We specialize in professional car light modification and upgrades. From standard headlights to powerful LED and Xenon setups, we enhance brightness, visibility, and overall vehicle style. Our mission is to boost night driving safety while giving your car a modern, standout look. Whether you want a sporty vibe or a premium lighting upgrade, we provide high-quality results with original materials."}
        </p>
      </div>
    </div>
  );
}
