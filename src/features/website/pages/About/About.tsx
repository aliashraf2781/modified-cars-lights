import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import {
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language; // 'ar' أو 'en'

  const websiteName = "Modified Car Lights";
  const pageTitle =
    lang === "ar"
      ? "عن الشركة | فوانيس سيارات معدلة"
      : "About Us | Modified Car Lights";

  const pageDescription =
    lang === "ar"
      ? "تعرف على فوانيس سيارات معدلة، فريقنا، قيمنا، وخبرتنا في تصميم وتحديث المصابيح الأمامية والخلفية وإضاءات LED."
      : "Learn about Modified Car Lights, our team, values, and expertise in designing and upgrading car headlights, taillights, and LED lighting.";

  const pageUrl = "https://modifiedcarlights.com/about";

  const features = [
    {
      icon: <FaRocket className="text-6xl mb-4" />,
      title: t("about.features.items.speed.title"),
      description: t("about.features.items.speed.desc"),
    },
    {
      icon: <FaLightbulb className="text-6xl mb-4" />,
      title: t("about.features.items.innovation.title"),
      description: t("about.features.items.innovation.desc"),
    },
    {
      icon: <FaUsers className="text-6xl mb-4" />,
      title: t("about.features.items.team.title"),
      description: t("about.features.items.team.desc"),
    },
    {
      icon: <FaHeart className="text-6xl mb-4" />,
      title: t("about.features.items.support.title"),
      description: t("about.features.items.support.desc"),
    },
  ];

  const stats = [
    { number: "500+", label: t("about.stats.items.clients") },
    { number: "1000+", label: t("about.stats.items.projects") },
    { number: "15+", label: t("about.stats.items.awards") },
    { number: "24/7", label: t("about.stats.items.support") },
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
        {/* Header Section */}
        <header className="text-center  ">
          <h1 className="text-6xl font-bold mb-5 text-red-700 drop-shadow-[0_0_20px_rgba(255,87,34,0.3)]">
            {t("about.header.title")}
          </h1>
          <p className="text-2xl opacity-90">{t("about.header.subtitle")}</p>
        </header>

        <div className=" py-16">
          {/* About Section */}
          <section className="p-12 mb-8 rounded-2xl bg-secondary border-r-4 border-red-700 transition-all duration-300 hover:-translate-x-2 hover:shadow-xl hover:shadow-red-500/20">
            <h2 className="text-4xl font-bold mb-6 pb-4 text-red-700 border-b-2 border-red-700/30">
              {t("about.story.title")}
            </h2>
            <p className="text-xl leading-relaxed mb-5">
              {t("about.story.text1")}
            </p>
            <p className="text-xl leading-relaxed">{t("about.story.text2")}</p>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-red-700">
              {t("about.features.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-xl text-center transition-all duration-300 border-2 bg-primary border-secondary hover:border-red-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/20 group"
                >
                  <div className="text-red-700 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-red-700">
                    {feature.title}
                  </h3>
                  <p className="opacity-85">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="p-12 rounded-2xl mb-16 bg-secondary">
            <h2 className="text-4xl font-bold text-center mb-12 text-red-700">
              {t("about.stats.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-xl border-2 bg-primary border-red-700 hover:scale-105 transition-transform duration-300"
                >
                  <span className="block text-5xl font-bold mb-3 text-red-700">
                    {stat.number}
                  </span>
                  <span className="text-xl">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="p-12 rounded-2xl bg-secondary border-r-4 border-red-700">
            <h2 className="text-4xl font-bold mb-8 pb-4 text-red-700 border-b-2 border-red-700/30">
              {t("about.values.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300"
                >
                  <FaCheckCircle className="text-3xl shrink-0 mt-1 text-red-700" />
                  <p className="text-xl">{value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
