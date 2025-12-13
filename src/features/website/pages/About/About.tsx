import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import {
  FaRocket,
  FaUsers,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const websiteName = "Modified Car Lights";

  const pageTitle =
    lang === "ar"
      ? "عن الشركة | فوانيس سيارات معدلة"
      : "About Us | Modified Car Lights";

  const pageDescription =
    lang === "ar"
      ? "تعرف على فوانيس سيارات معدلة، فريقنا، قيمنا، وخبرتنا في تصميم وتحديث المصابيح الأمامية والخلفية وإضاءات LED."
      : "Learn about Modified Car Lights, our team, values, and expertise in designing and upgrading car headlights, taillights, and LED lighting.";

  const pageUrl = `https://modifiedcarlights.com/${lang}/about`;

  const features = [
    {
      icon: <FaRocket className="text-6xl mb-4 text-red-600" />,
      title: t("about.features.items.speed.title"),
      description: t("about.features.items.speed.desc"),
    },

    {
      icon: <FaUsers className="text-6xl mb-4 text-red-600" />,
      title: t("about.features.items.team.title"),
      description: t("about.features.items.team.desc"),
    },
    {
      icon: <FaHeart className="text-6xl mb-4 text-red-600" />,
      title: t("about.features.items.support.title"),
      description: t("about.features.items.support.desc"),
    },
  ];



  const values = t("about.values.items", { returnObjects: true }) as string[];

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
              ? "عن الشركة, فوانيس سيارات, مصابيح سيارات, إضاءة LED, فريق العمل, قيم الشركة"
              : "about us, modified car lights, car headlights, taillights, LED lighting, team, company values"
          }
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content={websiteName} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: pageTitle,
            url: pageUrl,
            description: pageDescription,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-30 px-5 md:px-0 text-text container mx-auto">
        <header className="text-center">
          <h1 className="text-6xl font-bold mb-5 text-red-600 drop-shadow-[0_0_20px_rgba(255,87,34,0.15)]">
            {t("about.header.title")}
          </h1>
          <p className="text-2xl opacity-90 text-text">
            {t("about.header.subtitle")}
          </p>
        </header>

        <div className="py-16">
          <section className="p-12 mb-8 rounded-2xl bg-secondary border-r-4 border-gray-300 transition-all duration-300 hover:-translate-x-2 hover:shadow-xl hover:shadow-gray-400/10">
            <h2 className="text-4xl font-bold mb-6 pb-4 text-text border-b-2 border-gray-300/70">
              {t("about.story.title")}
            </h2>
            <p className="text-lg leading-relaxed mb-5 text-text">
              {t("about.story.text1")}
            </p>
            <p className="text-lg leading-relaxed text-text">
              {t("about.story.text2")}
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-text">
              {t("about.features.title")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-xl text-center transition-all duration-300 border-2 bg-primary border-gray-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-300/20 group"
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-text">
                    {feature.title}
                  </h3>
                  <p className="opacity-85 text-text">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-12 rounded-2xl bg-secondary border-r-4 border-gray-300">
            <h2 className="text-4xl font-bold mb-8 pb-4 text-text border-b-2 border-gray-300/70">
              {t("about.values.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300"
                >
                  <FaCheckCircle className="text-3xl shrink-0 mt-1 text-red-600" />
                  <p className="text-xl text-text">{value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
