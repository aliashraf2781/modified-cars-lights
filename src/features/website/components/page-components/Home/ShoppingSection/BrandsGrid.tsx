import { useState, useRef, useEffect } from "react";
import BrandList from "./BrandList";
import { useTranslation } from "react-i18next";
// import BrandModels from "./BrandModels";

type Brand = {
  id: string;
  name: string;
  logo: string;
};

type Props = {
  brands: Brand[];
  lang: string;
};

export default function BrandsGrid({ brands }: Props) {
  const {i18n}=useTranslation();
  const lang=i18n.language;
  const [showAll, setShowAll] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const modelsRef = useRef<HTMLButtonElement | null>(null);

  const visibleBrands = showAll ? brands : brands.slice(0, 6);

  useEffect(() => {
    if (selectedBrand && modelsRef.current) {
      modelsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedBrand]);

  return (
    <div className="rounded-2xl w-full flex flex-col items-center gap-6 px-4 lg:px-0">
      <BrandList
        brands={visibleBrands}
        selectedBrand={selectedBrand}
        onSelect={(brand) =>
          setSelectedBrand((prev) => (prev?.id === brand.id ? null : brand))
        }
      />

      <button
        ref={modelsRef}
        onClick={() => setShowAll((prev) => !prev)}
        className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        {showAll ? "Show Less" : "Show All"}
      </button>

      {/* Scroll target */}
      <div className="w-full">
        {/* {selectedBrand && <BrandModels brand={selectedBrand} lang={lang} />} */}
      </div>
    </div>
  );
}
