// @ts-nocheck
import { useParams } from "react-router";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import { useTopics } from "../../../core/hooks/useTopics";
import TopicCard from "../../components/ui/ProductCard/ProductCard"; // استيراد الكارد الجديد

export default function Products() {
  const categoryId = useParams().categoryId;
  const { topics } = useTopics({ carCategory: categoryId });

  return (
    <div className="flex flex-col gap-6 container mx-auto mt-25 px-3 md:px-0">
      <SectionHeader
        titleAr=""
        titleEn="Our "
        highlightAr="منتجاتنا"
        highlightEN="Products"
        descriptionAr="اكتشف مجموعتنا الواسعة من المنتجات المصممة لتلبية احتياجاتك."
        descriptionEn="Discover our wide range of products designed to meet your needs."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
