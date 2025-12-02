import { useParams } from "react-router";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import { useTopics } from "../../../core/hooks/useTopics";
import TopicCard from "../../components/ui/ProductCard/ProductCard"; // استيراد الكارد الجديد
import { useTranslation } from "react-i18next";

export default function Products() {
  const categoryId = useParams().categoryId;
  const { topics } = useTopics({ carCategory: categoryId });
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 container mx-auto mt-25 px-3 md:px-0">
      <SectionHeader
        titleAr={t("products.title")}
        titleEn={t("products.title")}
        highlightAr={t("products.highlight")}
        highlightEN={t("products.highlight")}
        descriptionAr={t("products.description")}
        descriptionEn={t("products.description")}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
