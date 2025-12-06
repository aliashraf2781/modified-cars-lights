import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { FaTiktok, FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language; // 'ar' أو 'en'

  const websiteName = "Modified Car Lights";

  const pageTitle =
    lang === "ar"
      ? "تواصل معنا | فوانيس سيارات معدلة"
      : "Contact Us | Modified Car Lights";

  const pageDescription =
    lang === "ar"
      ? "تواصل مع فوانيس سيارات معدلة لأي استفسارات حول المصابيح الأمامية والخلفية المعدلة وإضاءات LED. تواصل معنا عبر WhatsApp، YouTube، أو TikTok."
      : "Get in touch with Modified Car Lights for inquiries about custom car headlights, taillights, and LED upgrades. Contact us via WhatsApp, YouTube, or TikTok.";

  const pageUrl = "https://modifiedcarlights.com/contact";

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
              ? "تواصل, فوانيس سيارات معدلة, مصابيح سيارات, إضاءة LED, دعم العملاء"
              : "contact, modified car lights, car headlights, taillights, LED upgrades, customer support, automotive lighting"
          }
        />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={websiteName} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />

        {/* Mobile SEO */}
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Structured Data (Schema.org) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: pageTitle,
            url: pageUrl,
            description: pageDescription,
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+201001744902",
                contactType: "Customer Service",
                areaServed: "EG",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-30 px-5 md:px-0 text-text container mx-auto">
        <div className=" flex flex-col gap-6">
          <h1 className="text-6xl font-bold mb-5 text-red-700 flex flex-col gap-2">
            {t("contact.title")}
            <span className="text-text text-sm">{t("contact.subtitle")}</span>
          </h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.836175234049!2d31.3800173!3d31.0347916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79c4a903c4f51%3A0x14af68485bde74f9!2sModified%20Car%20Lights!5e0!3m2!1sen!2seg!4v1702351202!5m2!1sen!2seg"
            width="100%"
            height="400"
            className="rounded-lg"
          ></iframe>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {/* WhatsApp */}
            <a
              href="https://wa.me/+201001744902"
              className="p-6 rounded-lg flex flex-col bg-secondary gap-2 items-center hover:shadow-lg hover:border-gray-300 hover:border-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <FaWhatsapp className="w-25 h-25 text-white bg-green-700 p-3 rounded-xl" />
              <p className="text-text text-center text-sm">
                {t("contact.whatsapp")}
              </p>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@modifiedcarlights"
              className="p-6 rounded-lg flex flex-col bg-secondary gap-2 items-center hover:shadow-lg hover:border-gray-300 hover:border-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <FaYoutube className="w-25 h-25 text-red-700 bg-white p-3 rounded-xl" />
              <p className="text-text text-center text-sm">
                {t("contact.youtube")}
              </p>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@modifiedcarlights?is_from_webapp=1&sender_device=pc"
              className="p-6 rounded-lg flex flex-col bg-secondary gap-2 items-center hover:shadow-lg hover:border-gray-300 hover:border-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <FaTiktok className="w-25 h-25 text-white bg-black p-3 rounded-xl" />
              <p className="text-text text-center text-sm">
                {t("contact.tiktok")}
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
