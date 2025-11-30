import BrandsGrid from "./BrandsGrid";
import { useCategories } from "../../../../../core/hooks/useCategories";
import SectionHeader from "../../../common/SectionHeader/SectionHeader";

export default function ShoppingSection({ lang }: { lang: string }) {
  const { categories } = useCategories();

  return (
    <section className="cars-types container mx-auto flex flex-col items-center gap-8">
      <SectionHeader
        titleAr="تسوق من أفضل"
        titleEn="Shop from the Best"
        highlightAr="الماركات"
        highlightEN="Brands"
        descriptionAr="اكتشف مجموعة واسعة من السيارات من أفضل الماركات العالمية."
        descriptionEn="Explore a wide range of cars from the best global brands."
      />
      <BrandsGrid brands={categories} lang={lang} />
    </section>
  );
}
