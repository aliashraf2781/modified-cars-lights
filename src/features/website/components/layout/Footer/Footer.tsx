import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { MdPhone, MdLocationOn } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = i18n.dir();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/ModifiedCarLights",
      label: "Facebook",
      style:
        "text-blue-600 w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white transition duration-300",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/modified_car_lights",
      label: "Instagram",
      style:
        "text-pink-600 w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 text-gray-400 hover:text-white transition duration-300",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@ModifiedCarLights",
      label: "YouTube",
      style:
        "text-red-600 w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white transition duration-300",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@modifiedcarlights",
      label: "Tiktok",
      style:
        "text-white w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-orange-600 text-gray-400 hover:text-white transition duration-300",
    },
  ];

  return (
    <footer className="text-gray-300">
      <div className="container mx-auto px-6 md:px-0 py-9 flex flex-col gap-12">
        <div className="grid grid-cols-1 gap-10">
          {/* Logo & Info */}
          <div className="mx-auto text-center  flex flex-col gap-4">
              <h2 className="text-2xl lg:text-4xl font-bold bg-linear-to-r from-red-800 via-red-700 to-red-500 bg-clip-text text-transparent">
                Modified Car Lights
              </h2>

            <div
              dir={dir}
              className="text-sm flex flex-col  items-center justify-center gap-2"
            >
              <a
                dir={dir}
                href="tel:+201001744902"
                className="flex items-center gap-2 justify-center"
              >
                <div className="flex gap-3 items-center p-4 border border-gray-200/50 hover:border-red-600 hover:scale-105 transition duration-300 rounded">
                  <MdPhone className="text-red-600 " />{" "}
                  <p className="text-center text-sm font-bold">
                    {lang == "ar" ? "اتصل بنا :" : "Call Us :"}
                  </p>
                  <p dir="ltr" className="text-center">
                    +2010 01744902
                  </p>{" "}
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/Fq6R137QX2gVbLyg7"
                target="_blank"
                className="flex items-center gap-2 justify-center"
              >
                <div className="flex gap-3 items-center p-4 border border-gray-200/50 hover:border-red-600 hover:scale-105 transition duration-300 rounded">
                  <MdLocationOn className="text-red-600" />{" "}
                  <p className="text-center text-sm font-bold">
                    {lang == "ar"
                      ? "دوس هنا عشان توصل لينا :"
                      : "Get Our Location :"}
                  </p>
                  <p dir={dir}>{t("footer.address")}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto container text-center">
          <h2 className="text-3xl font-extrabold sm:text-5xl">
            {t("footer.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text/40">
            {t("footer.cta.description")}
          </p>
          {/* to whatsapp */}
          <a
            href="https://wa.me/201001744902"
            className="mt-8 inline-block rounded-full border border-red-600 hover:border-red-600 hover:scale-105 transition duration-300 px-12 py-3 text-sm font-medium text-text hover:scale-3d"
          >
            {t("footer.cta.button")}
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            {t("footer.copyright", { year: currentYear })}
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label, style }) => (
              <a key={label} href={href} className={style}>
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
