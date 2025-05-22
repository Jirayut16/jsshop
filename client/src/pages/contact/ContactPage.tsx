import PublicHeader from "../../layout/PublicHeader";

const ContactPage = () => {
  return (
    <>
      <nav>
        <PublicHeader classname="bg-background dark:bg-soft-dark dark:text-text-dark md:bg-transparent w-full md:static border-b border-gray-600 shadow-md p-1 "></PublicHeader>
      </nav>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background dark:bg-background-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-dark mb-4">
              Contact Our Member Team
            </h1>
            <p className="text-lg text-text dark:text-text-dark">
              Have a question about our latest collection? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-light dark:bg-soft-dark rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-primary dark:text-primary-dark mb-8">
                Get in Touch
              </h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary dark:bg-secondary-dark rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-text dark:text-text-dark">
                      Visit Our Store
                    </h3>
                    <p className="mt-1 text-main dark:text-primary-dark">
                      Jsshop District, 123 Style Avenue
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary dark:bg-secondary-dark rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-text dark:text-text-dark">
                      Email Us
                    </h3>
                    <a
                      href="mailto:jsshop@example.com"
                      className="mt-1 text-accent dark:text-accent-dark hover:underline"
                    >
                      jsshop@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary dark:bg-secondary-dark rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-text dark:text-text-dark">
                      Call Us
                    </h3>
                    <p className="mt-1 text-main dark:text-primary-dark">
                      01-234-567-890
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-light dark:bg-soft-dark rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-primary dark:text-primary-dark mb-8">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-secondary dark:border-secondary-dark text-text dark:text-text-dark focus:outline-none focus:border-accent dark:focus:border-accent-dark"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-secondary dark:border-secondary-dark text-text dark:text-text-dark focus:outline-none focus:border-accent dark:focus:border-accent-dark"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-secondary dark:border-secondary-dark text-text dark:text-text-dark focus:outline-none focus:border-accent dark:focus:border-accent-dark"
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white font-medium rounded-lg bg-button hover:bg-accent dark:bg-accent-dark dark:hover:bg-accent transition-colors duration-300 cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
