import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import HeroSection from "../../components/common/HeroSection/HeroSection";
import BrandingSection from "../../components/page-components/Home/BrandingSection/BrandingSection";
import ShoppingSection from "../../components/page-components/Home/ShoppingSection/ShoppingSection";
import RecentProductsSection from "../../components/page-components/Home/RecentProductsSection/RecentProductsSection.tsx";
export default function Home() {
  const { i18n  } = useTranslation();
  
  const lang = i18n.language; 


  const websiteName = "Modified Car Lights";

  const pageTitle =
    lang === "ar"
      ? "فوانيس سيارات معدلة | إضاءات LED وتحديثات مصابيح السيارات"
      : "Modified Car Lights | Custom Car Headlights & LED Upgrades";

  const pageDescription =
    lang === "ar"
      ? "اكتشف أفضل المصابيح الأمامية والخلفية المعدلة وإضاءات LED عالية الجودة لجميع أنواع السيارات. حسن رؤية سيارتك ومظهرها بأفضل حلول الإضاءة."
      : "Discover high-quality modified headlights, taillights, and premium LED lighting for all car models. Upgrade your car visibility and style with our unique automotive lighting solutions.";

  const pageUrl = "https://modifiedcarlights.com";

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={
            lang === "ar"
              ? "فوانيس سيارات, مصابيح معدلة, إضاءة LED, تحديثات المصابيح, اكسسوارات سيارات"
              : "modified car lights, custom headlights, car LED lights, taillights, automotive lighting upgrades, car accessories"
          }
        />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph (Social Sharing) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={websiteName} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />

        {/* Mobile SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Structured Data (Schema.org) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: websiteName,
            url: pageUrl,
            description: pageDescription,
          })}
        </script>
      </Helmet>

      <div className="flex flex-col gap-8 md:gap-15 ">
        <HeroSection />
        <BrandingSection />
        <ShoppingSection />
        <RecentProductsSection />
      </div>
    </>
  );
}
