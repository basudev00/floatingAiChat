import React from "react";

interface Feature {
  name: string;
  description: string;
  icon: string;
}

const FeatureSection: React.FC = () => {
  const features: Feature[] = [
    {
      name: "Free Shipping",
      description:
        "Enjoy free delivery on all orders above $50. We ship globally with tracked services.",
      icon: "truck",
    },
    {
      name: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any queries.",
      icon: "headset",
    },
    {
      name: "Secure Payment",
      description:
        "We use industry-standard encryption to ensure your payment details are always safe.",
      icon: "shield-check",
    },
    {
      name: "Easy Returns",
      description:
        "Not satisfied? Return your items within 30 days for a full refund, no questions asked.",
      icon: "refresh-ccw",
    },
  ];

  return (
    <div
      id="features"
      className="py-12 bg-white"
      data-name="features"
      data-file="components/FeatureSection.tsx"
    >
      <div className="container-custom">
        <div className="lg:text-center">
          <h2 className="text-base text-[var(--primary-color)] font-semibold tracking-wide uppercase">
            Why Choose Us
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to shop online
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We prioritize your experience with seamless services designed to
            make shopping effortless and enjoyable.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[var(--primary-color)] text-white">
                    <div className={`icon-${feature.icon} text-xl`}></div>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
