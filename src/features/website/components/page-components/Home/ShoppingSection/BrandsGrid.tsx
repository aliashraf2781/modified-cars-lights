import { useState, useRef, useEffect } from "react";
import BrandList from "./BrandList";
import BrandModels from "./BrandModels";

type Brand = {
  id: string;
  name: string;
  logo: string;
};

type Props = {
  brands: Brand[];
};

export default function BrandsGrid({ brands }: Props) {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const modelsRef = useRef<HTMLDivElement | null>(null); // ← عدلتها Div

  useEffect(() => {
    if (selectedBrand && modelsRef.current) {
      modelsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedBrand]);

  return (
    <div className="rounded-2xl w-full flex flex-col items-center gap-6 px-4 lg:px-0">
      <BrandList
        brands={brands}
        selectedBrand={selectedBrand}
        onSelect={(brand) =>
          setSelectedBrand((prev) => (prev?.id === brand.id ? null : brand))
        }
      />

      {/* Scroll target */}
      <div className="w-full" ref={modelsRef}>
        {selectedBrand && <BrandModels brand={selectedBrand} />}
      </div>
    </div>
  );
}
