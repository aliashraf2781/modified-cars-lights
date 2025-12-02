import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ShowAll() {
  const { t } = useTranslation();
  return (
    <Link
      to="/products"
      className="mt-4 border border-red-900 px-6 py-2 bg-primary text-white  hover:bg-primary/90 transition-colors duration-300 rounded-full inline-block"
    >
      {t("common.viewAllProducts")}
    </Link>
  );
}
