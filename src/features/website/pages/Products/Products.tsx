import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import { useTopics } from "../../../core/hooks/useTopics";
import TopicCard from "../../components/ui/ProductCard/ProductCard";
import { useTranslation } from "react-i18next";

export default function Products() {
  const categoryId = useParams().categoryId;
  const { topics } = useTopics({ carCategory: categoryId });
  const { t, i18n } = useTranslation();
  const lang = i18n.language; 

  const pageTitle =
    lang === "ar"
      ? `المنتجات | فوانيس سيارات معدلة `
      : `Products | Modified Car Lights`;

  const pageDescription =
    lang === "ar"
      ? `استعرض أفضل المصابيح الأمامية والخلفية المعدلة وإضاءات LED للسيارات من فئة ${categoryId}. حسن مظهر سيارتك ورؤيتها بأفضل الحلول.`
      : `Explore premium modified headlights, taillights, and LED lighting products for ${categoryId} cars. Upgrade your vehicle's style and visibility.`;

  const pageUrl = `https://modifiedcarlights.com/products/${categoryId}`;

  return (
    <>
      <Helmet>
        <html lang={lang} />

        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={
            lang === "ar"
              ? "مصابيح سيارات, إضاءة LED, فوانيس سيارات معدلة, تحديثات المصابيح, اكسسوارات سيارات"
              : "car lights, modified car lights, headlights, taillights, car LED upgrades, automotive lighting products"
          }
        />

        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Modified Car Lights" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: pageTitle,
            url: pageUrl,
            description: pageDescription,
          })}
        </script>
      </Helmet>

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
          {topics.map((topic ) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </>
  );
}
