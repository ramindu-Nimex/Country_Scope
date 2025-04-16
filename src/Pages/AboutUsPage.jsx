import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-100 to-green-200 px-6 py-12 flex items-center justify-center">
      <div className="max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
            About Us
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover the vision behind our CountryScope Site
          </p>
        </div>

        {/* Content */}
        <div className="text-gray-700 dark:text-gray-200 space-y-4 text-justify leading-relaxed">
          <p>
            Our mission is to create a simple yet powerful tool that allows users
            to explore countries and their details effortlessly. Whether you're a
            student, traveler, or just curious, our app helps you find country
            data by name or region with ease.
          </p>

          <p>
            We believe that learning about different countries and cultures can
            broaden our understanding of the world. This project is built with
            modern web technologies including <strong>React</strong>, <strong>Tailwind CSS</strong>, and
            <strong> Flowbite</strong>, and uses the <strong>REST Countries API</strong> to power the data.
          </p>

          <p>
            We're constantly improving and adding new features to make your
            experience even better. Stay tuned for more updates!
          </p>
        </div>

        {/* Footer / Team Info */}
        <div className="pt-6 border-t border-gray-300 dark:border-gray-600 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
          Designed and developed by Ramindu © 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;