import { useTranslation } from "react-i18next";

export default function BrandingSection() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl text-text font-bold mb-4">
          {t("home.branding.title")}
        </h2>

        <p className="text-text/80 max-w-4xl text-lg leading-relaxed">
          {t("home.branding.description")}
        </p>
      </div>
    </div>
  );
}
