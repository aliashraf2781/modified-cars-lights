import { useTranslation } from "react-i18next";

interface SectionHeaderProps {
  titleAr: string;
  titleEn: string;
  highlightAr: string;
  highlightEN: string;
  descriptionAr: string;
  descriptionEn: string;
}

export default function SectionHeader({
  titleAr,
  titleEn,
  highlightAr,
  highlightEN,
  descriptionAr,
  descriptionEn,
  
}: SectionHeaderProps) {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">
        {lang ==="ar" ? titleAr : titleEn} <span className="text-red-600 animate-pulse">{lang ==="ar" ?  highlightAr : highlightEN} </span>
      </h2>
      <p className="text-gray-400 text-sm md:text-base">{lang === "ar" ? descriptionAr : descriptionEn}</p>
    </div>
  );
}
