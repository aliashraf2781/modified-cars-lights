import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: "Headlights", href: "/products/headlights" },
      { name: "Tail Lights", href: "/products/tail-lights" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
    ],
    support: [
      { name: "Contact", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className=" text-gray-300">
      <div className="container mx-auto px-6 md:px-0 py-9 flex flex-col gap-12">
        <div className="grid grid-cols-1  lg:grid-cols-6 gap-10">
          {/* Logo & Info */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold bg-linear-to-r from-red-700 to-red-500 bg-clip-text text-transparent">
                Modified Car Lights
              </h2>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              Upgrade your ride with premium lighting — performance and style in
              every beam.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MdPhone className="text-red-600" /> +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <MdEmail className="text-red-600" /> info@modifiedcarlights.com
              </div>
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-red-600" /> 123 Auto Street, City
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 capitalize text-white">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-red-600 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto container text-center ">
          <h2 className="text-3xl font-extrabold sm:text-5xl">
            Ready to Upgrade Your Car's Lighting?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text/40">
            Get in touch with our team to discuss your specific needs and
            preferences. We're here to help you create the perfect lighting
            solution for your vehicle.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-full border border-red-600 px-12 py-3 text-sm font-medium text-text hover:scale-3d "
          >
            {" "}
            Get Contact with Us{" "}
          </a>{" "}
        </div>

        {/* Bottom bar */}
        <div className="  flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Modified Car Lights. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white transition duration-300"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
