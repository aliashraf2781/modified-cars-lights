import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: t("footer.links.headlights"), href: "/products/headlights" },
      { name: t("footer.links.tailLights"), href: "/products/tail-lights" },
    ],
    company: [
      { name: t("footer.links.aboutUs"), href: "/about" },
      { name: t("footer.links.ourStory"), href: "/story" },
    ],
    support: [
      { name: t("footer.links.contact"), href: "/contact" },
      { name: t("footer.links.faqs"), href: "/faqs" },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="text-gray-300">
      <div className="container mx-auto px-6 md:px-0 py-9 flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
          {/* Logo & Info */}
          <div className="lg:col-span-3">
            <a href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold bg-linear-to-r from-red-700 to-red-500 bg-clip-text text-transparent">
                Modified Car Lights
              </h2>
            </a>

            <p className="text-sm text-gray-400 mb-6">
              {t("footer.description")}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MdPhone className="text-red-600" /> +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <MdEmail className="text-red-600" /> info@modifiedcarlights.com
              </div>
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-red-600" /> {t("footer.address")}
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 capitalize text-white">
                {t(`footer.links.${category}`)}
              </h3>

              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-red-600 transition"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mx-auto container text-center">
          <h2 className="text-3xl font-extrabold sm:text-5xl">
            {t("footer.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text/40">
            {t("footer.cta.description")}
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-full border border-red-600 px-12 py-3 text-sm font-medium text-text hover:scale-3d"
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
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white transition duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
