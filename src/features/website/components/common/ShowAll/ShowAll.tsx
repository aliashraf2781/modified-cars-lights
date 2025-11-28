import { Link } from "react-router-dom";

export default function ShowAll() {
  return (
    <Link
      to="/products"
      className="mt-4 border border-red-900 px-6 py-2 bg-primary text-white  hover:bg-primary/90 transition-colors duration-300 rounded-full inline-block"
    >
      View All Products
    </Link>
  );
}
