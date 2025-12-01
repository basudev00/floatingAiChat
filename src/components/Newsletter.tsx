import React, { useState, type FormEvent } from "react";

type NewsletterStatus = "idle" | "success" | "error";

const useNewsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Simulate API call - in a real app, you would make an actual API call here
    setStatus("success");
    setEmail("");

    const timer = setTimeout(() => setStatus("idle"), 3000);
    return () => clearTimeout(timer);
  };

  return {
    email,
    setEmail,
    status,
    handleSubmit,
  };
};

const Newsletter: React.FC = () => {
  const { email, setEmail, status, handleSubmit } = useNewsletter();

  return (
    <div
      id="newsletter"
      className="bg-[var(--primary-color)]"
      data-name="newsletter"
      data-file="components/Newsletter.tsx"
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Sign up for our newsletter
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-indigo-200">
            Get the latest updates on new products and upcoming sales. No spam,
            we promise.
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <form className="sm:flex" onSubmit={handleSubmit}>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[var(--primary-color)] bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                disabled={status === "success"}
              >
                {status === "success" ? "Subscribed!" : "Notify me"}
              </button>
            </div>
          </form>
          {status === "success" && (
            <p className="mt-3 text-sm text-green-200 font-medium">
              Thanks for subscribing! We'll be in touch.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
