interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    logo: string;
  };
}

export default function CarCategoryCard({ brand }: BrandCardProps) {
  return (
    <div className="flex flex-col items-center group ">
      {/* Brand Image Container */}
      <div className="relative w-20 h-20 md:w-32 md:h-32 mb-3">
        {/* Glow Effect */}
        <div className="absolute  inset-0 rounded-full bg-linear-to-br from-red-700 to-[#ff8a65] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Main Circle */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg transition-all duration-500 border-2 border-secondary group-hover:border-red-700 group-hover:shadow-red-700/50 group-hover:scale-110 bg-linear-to-br from-white to-gray-100">
          <img
            src={brand?.logo}
            alt={brand.name}
            className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* <div className="absolute  inset-0 bg-linear-to-t from-red-700/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
        </div>
      </div>

      {/* Brand Name */}
      <p className="text-sm capitalize md:text-base font-semibold transition-all duration-300 text-text group-hover:text-red-700 group-hover:scale-105">
        {brand.name}
      </p>

      {/* Underline Animation */}
      <div className="h-0.5 bg-linear-to-r from-transparent via-red-700 to-transparent transition-all duration-500 mt-2 w-0 opacity-0 group-hover:w-full group-hover:opacity-100" />
    </div>
  );
}
