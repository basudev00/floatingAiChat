import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = ["facebook", "twitter", "instagram", "linkedin"];
  const shopLinks = [
    "New Arrivals",
    "Best Sellers",
    "Electronics",
    "Fashion",
    "Accessories",
  ];
  const supportLinks = [
    "Help Center",
    "Shipping Status",
    "Returns & Exchanges",
    "Size Guide",
    "Contact Us",
  ];
  const companyLinks = [
    "About Us",
    "Careers",
    "Press",
    "Privacy Policy",
    "Terms of Service",
  ];

  return (
    <footer
      className="bg-gray-900"
      data-name="footer"
      data-file="components/Footer.tsx"
    >
      <div className="container-custom pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center text-white font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center mr-2">
                <div className="icon-shopping-bag text-white text-lg"></div>
              </div>
              ShopEasy
            </div>
            <p className="text-gray-400 text-sm">
              Making premium products accessible to everyone. Quality you can
              trust, prices you'll love.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="sr-only">{social}</span>
                  <div className={`icon-${social} text-xl`}></div>
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400">
            &copy; {currentYear} ShopEasy Inc. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
