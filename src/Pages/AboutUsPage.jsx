import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen  p-8">
      {/* Main Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-800 dark:text-lime-600 mb-4">
          Welcome to CountryScope
        </h1>
        <p className="text-xl text-green-600 dark:text-lime-800">
          Your gateway to exploring the world's countries, cultures, and statistics
        </p>
      </div>

      {/* Main Content Card */}
      <div className="max-w-7xl mx-auto bg-white/90 rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Content Side */}
          <div className="md:w-1/2 p-8 md:p-12 bg-white/95">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              About Our Platform
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We strive to create a seamless platform that connects users with comprehensive
                  information about countries worldwide. Our goal is to make global exploration
                  accessible and engaging for everyone.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  What We Offer
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Access detailed country information, cultural insights, and up-to-date
                  statistics. Whether you're a student, traveler, or curious explorer,
                  CountryScope provides the tools you need for global discovery.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  Technology
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Built with modern technologies like <span className="text-green-600">React</span> and
                  <span className="text-green-600"> Tailwind CSS</span>, powered by the
                  <span className="text-green-600"> REST Countries API</span> for reliable
                  and current data.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Side */}
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-emerald-700/30"></div>
            <img
              src="/aboutUs.jpg"
              alt="World Exploration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center text-white p-12 bg-gradient-to-t from-green-900/60 via-transparent to-transparent">
              <h2 className="text-xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                Explore the World
              </h2>
              <p className="text-sm md:text-lg text-gray-100 drop-shadow-lg">
                Join CountryScope to unlock a world of discovery. Access detailed
                country information, cultural insights, and global statistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;