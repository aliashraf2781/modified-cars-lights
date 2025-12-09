import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import CarCategoryCard from "../../../ui/BrandCard/BrandCard";
import { FaSearch } from "react-icons/fa";

type Brand = {
  id: string;
  name: string;
  logo: string;
};

type Props = {
  brands: Brand[];
  selectedBrand: Brand | null;
  onSelect: (brand: Brand) => void;
};

export default function BrandList({ brands, selectedBrand, onSelect }: Props) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = useMemo(
    () =>
      brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [brands, searchTerm]
  );

  return (
    <div className="flex flex-col gap-7 w-full">
      {/* search bar */}
      <div className="flex items-center justify-center gap-2 w-full relative">
        <input
          type="text"
          placeholder={t("home.search.placeholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="placeholder:text-2xl w-[70%] text-white p-2 pl-10 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-red-600 focus:ring-red-600 transition-all duration-300 hover:border-red-600 hover:ring-red-600 hover:cursor-pointer"
        />
        <FaSearch className="absolute left-[calc(15%+10px)] text-gray-400 pointer-events-none" />
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 w-full text-center min-h-[200px]">
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand, i) => (
            <div
              key={i}
              onClick={() => onSelect(brand)}
              className={`cursor-pointer transition-all ${
                selectedBrand?.id === brand.id
                  ? "scale-105 border-2 border-red-600 rounded-xl"
                  : "hover:scale-105"
              }`}
            >
              <CarCategoryCard brand={brand} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center w-full h-full">
            <p className="text-white font-bold text-lg">{t("home.search.noResults")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
