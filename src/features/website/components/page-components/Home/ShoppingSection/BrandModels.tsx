
// import { Link } from "react-router-dom";
// import { useSubCategories } from "../../../../../core/hooks/useSubCategories";



// export default function BrandModels({
//   brand,
//   lang = "ar",
// }: {
//   brand: { id: string; name: string };
//   lang: string;
// }) {
//   const {
//     subCategories,
//     loading,
//   } = useSubCategories(brand.id, lang);

//   return (
//     <div className="w-full pt-6 animate-fadeIn">
//       <h3 className="text-xl font-semibold text-center text-white mb-4">
//         {brand.name} Models
//       </h3>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading...</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {subCategories.map((model, i) => (
//             <Link
//               to={`/products/${model.id}`}
//               key={i}
//               className="border border-gray-600 rounded-xl py-3 text-center text-sm text-gray-300 hover:bg-gray-800 transition-all cursor-pointer"
//             >
//               {model.name}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
