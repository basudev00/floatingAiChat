import React from "react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
  rating?: number; // Optional rating property
}

const StarRating: React.FC<{ rating?: number }> = ({ rating = 5 }) => {
  return (
    <div className="flex mb-4 text-yellow-400">
      {[...Array(rating)].map((_, i) => (
        <div key={i} className="icon-star fill-current text-sm"></div>
      ))}
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      text: "The quality of the products is absolutely outstanding. I've recommended ShopEasy to all my followers and they love it!",
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      text: "Fast shipping and great customer service. The headphones I bought are genuine and sound amazing. Will definitely buy again.",
    },
    {
      name: "Emily Davis",
      role: "Interior Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      text: "I found unique pieces here that I couldn't find anywhere else. The minimalist watch is my new daily favorite.",
    },
  ];

  return (
    <div
      id="testimonials"
      className="bg-white section-padding"
      data-name="testimonials"
      data-file="components/Testimonials.tsx"
    >
      <div className="container-custom">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-12">
          Trusted by thousands
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.image}
                  alt={`Portrait of ${testimonial.name}`}
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <StarRating rating={testimonial.rating} />
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
