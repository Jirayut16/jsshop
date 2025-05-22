import PublicHeader from "../../layout/PublicHeader";

const AboutPage = () => {
  return (
    <>
      <nav>
        <PublicHeader classname="bg-background dark:bg-soft-dark dark:text-text-dark md:bg-transparent w-full md:static border-b border-gray-600 shadow-md p-1" />
      </nav>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background dark:bg-background-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <span className="text-accent dark:text-accent-dark text-sm font-semibold tracking-wider uppercase mb-2 block">
              Welcome to
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary dark:text-primary-dark mb-4">
              JS FASHION
            </h1>
            <p className="text-xl text-text dark:text-text-dark max-w-2xl mx-auto">
              Your Premier Destination for Contemporary Fashion
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <div className="bg-light dark:bg-soft-dark rounded-2xl shadow-xl p-10 transform hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-3xl font-bold text-primary dark:text-primary-dark mb-6">
                Our Story
              </h2>
              <p className="text-lg text-text dark:text-text-dark mb-4 leading-relaxed">
                Founded with a passion for fashion, JS FASHION began with a
                simple mission: to deliver high-quality, trendy clothing at
                accessible prices. We carefully curate our collections to match
                every lifestyle and occasion.
              </p>
              <p className="text-lg text-text dark:text-text-dark leading-relaxed">
                With over 5 years of experience, we've earned the trust of
                countless customers through our commitment to quality,
                nationwide delivery service, and satisfaction guarantee.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-dark mb-12">
              Why Choose JS FASHION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Quality",
                  description:
                    "Carefully selected materials and excellent craftsmanship",
                  icon: "👕",
                },
                {
                  title: "Best Value",
                  description: "Competitive prices for exceptional quality",
                  icon: "💎",
                },
                {
                  title: "Fast Delivery",
                  description: "Nationwide shipping with real-time tracking",
                  icon: "✈️",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-light dark:bg-soft-dark rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
                >
                  <div className="text-5xl mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-semibold text-primary dark:text-primary-dark mb-4">
                    {value.title}
                  </h3>
                  <p className="text-text dark:text-text-dark text-lg">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { number: "5,000+", label: "Happy Customers" },
              { number: "1,000+", label: "Products" },
              { number: "24/7", label: "Support" },
              { number: "100%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary dark:from-accent-dark dark:to-primary-dark bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-lg font-medium text-text dark:text-text-dark">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="bg-light dark:bg-soft-darkrounded-2xl shadow-xl p-10 text-center">
            <h2 className="text-3xl font-bold text-primary dark:text-primary-dark mb-6">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-text dark:text-text-dark hover:text-accent transition-colors duration-300">
                📱 Line Official: @jsshop
              </p>
              <p className="text-lg text-text dark:text-text-dark hover:text-accent transition-colors duration-300">
                🕒 Hours: Mon-Sun 9:00 AM - 6:00 PM
              </p>
              <a
                href="mailto:contact@jsfashion.com"
                className="text-lg text-text dark:text-text-dark hover:text-accent transition-colors duration-300 inline-block"
              >
                ✉️ jsshop@example.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
