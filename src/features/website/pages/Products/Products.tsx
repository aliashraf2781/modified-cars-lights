import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { useTopics } from "../../../core/hooks/useTopics";
import TopicCard from "../../components/ui/ProductCard/ProductCard";
import { useTranslation } from "react-i18next";
import Loader from "../../components/common/Loader/Loader";

export default function Products() {
  const categoryId = useParams().categoryId;
  const { topics, loading } = useTopics({ carCategory: categoryId });
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
console.log(topics);
  const pageTitle =
    lang === "ar"
      ? `المنتجات | فوانيس سيارات معدلة `
      : `Products | Modified Car Lights`;

  const pageDescription =
    lang === "ar"
      ? `استعرض أفضل المصابيح الأمامية والخلفية المعدلة وإضاءات LED للسيارات من فئة ${categoryId}. حسن مظهر سيارتك ورؤيتها بأفضل الحلول.`
      : `Explore premium modified headlights, taillights, and LED lighting products for ${categoryId} cars. Upgrade your vehicle's style and visibility.`;

  const pageUrl = `https://modifiedcarlights.com/${lang}/products/${categoryId}`;
  if (loading) {
    return <Loader />;
  }
  if (!topics.length) {
    return (
      <div className="text-white h-screen flex items-center justify-center">
        {lang === "ar" ? "لا يوجد منتجات" : "No products"}
      </div>
    );
  }
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

      <div className="flex flex-col gap-6 container mx-auto mt-25 px-3 md:px-0 min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
            {t("products.title")}
            <span className="text-red-600 animate-pulse">
              {t("products.highlight")}{" "}
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {t("products.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </>
  );
}
