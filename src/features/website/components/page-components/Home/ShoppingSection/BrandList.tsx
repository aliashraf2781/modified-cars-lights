import CarCategoryCard from "../../../ui/BrandCard/BrandCard";

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
  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 w-full">
      {brands?.map((brand, i) => (
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
      ))}
    </div>
  );
}
