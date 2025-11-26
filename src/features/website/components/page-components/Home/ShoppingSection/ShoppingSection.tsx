import BrandsGrid from "./BrandsGrid";
import { useCategories } from "../../../../../core/hooks/useCategories";
import SectionHeader from "../../../common/SectionHeader/SectionHeader";

export default function ShoppingSection({ lang }: { lang: string }) {
  const { categories } = useCategories(lang);

  return (
    <section className="cars-types container mx-auto flex flex-col items-center gap-8">
      <SectionHeader
        title="Shop by"
        highlight="Brand"
        description="Premium lighting solutions for all major car manufacturers"
      />
      <BrandsGrid brands={categories} lang={lang} />
    </section>
  );
}
