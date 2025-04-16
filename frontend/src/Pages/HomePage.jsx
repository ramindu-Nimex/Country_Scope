import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/searchCountries");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-200 to-green-300 flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 drop-shadow-lg">
          🌍 Explore Countries Around the World
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Search and filter countries by name or region. View detailed stats
          including population, capital, languages, and more!
        </p>
        <div className="pt-4 flex justify-center">
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-gray-900 hover:from-lime-500 hover:to-lime-700 transition-all duration-300"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
