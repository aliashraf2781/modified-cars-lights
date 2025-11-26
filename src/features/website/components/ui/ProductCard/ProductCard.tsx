import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface ProductCardProps {
  name: string;
  description: string;
  imageUrl: string;
  badge?: string;
  href?: string;
}

export default function ProductCard({
  name,
  description,
  imageUrl,
  badge,
  href = "#",
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="product-card block w-full h-fit bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-700/20 transition-all duration-500 group border border-[#2a2a2a] hover:border-red-700/50"
    >
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden bg-[#0f0f0f]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-full group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Corner Accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-red-700/50 rounded-br-xl" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-text group-hover:text-red-700 transition-colors duration-300 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a] group-hover:border-red-700/30 transition-colors duration-300">
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Learn More
          </span>
          <div className="w-8 h-8 rounded-full bg-[#2a2a2a] group-hover:bg-red-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>

      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-transparent via-red-700/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </Link>
  );
}
