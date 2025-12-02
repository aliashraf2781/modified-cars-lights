import BrandsGrid from "./BrandsGrid";
import { useCategories } from "../../../../../core/hooks/useCategories";
import SectionHeader from "../../../common/SectionHeader/SectionHeader";
import { useTranslation } from "react-i18next";

export default function ShoppingSection() {
  const { categories } = useCategories();
  const { t } = useTranslation();

  return (
    <section className="cars-types container mx-auto flex flex-col items-center gap-8">
      <SectionHeader
        titleAr={t("home.shopping.title")}
        titleEn={t("home.shopping.title")}
        highlightAr={t("home.shopping.highlight")}
        highlightEN={t("home.shopping.highlight")}
        descriptionAr={t("home.shopping.description")}
        descriptionEn={t("home.shopping.description")}
      />
      <BrandsGrid brands={categories} />
    </section>
  );
}
