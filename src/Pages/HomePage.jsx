import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  const handleGetStarted = () => {
    navigate("/searchCountries");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (trimmed) {
      navigate(`/searchCountries?searchTerm=${encodeURIComponent(trimmed)}`);
    }
    setTerm("");
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section with World Map Background */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Background with world map */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/70 to-blue-900/60 z-10"></div>
          <img
            src="/hero.png"
            alt="World Map Background"
            className="w-full h-full object-cover opacity-40"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://cdn.pixabay.com/photo/2016/11/13/12/52/kuala-lumpur-1820944_1280.jpg";
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="py-6 px-8">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-2xl font-bold">
                World Explorer
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow flex items-center justify-center px-6 py-12">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <div className="text-white space-y-8">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    Discover the <span className="text-green-400">World</span>{" "}
                    Around You
                  </h1>
                  <p className="text-xl text-gray-200 max-w-lg">
                    Explore countries, learn about their cultures, languages,
                    and fascinating statistics. Your journey around the globe
                    starts here.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      onClick={handleGetStarted}
                      className="bg-gradient-to-r from-teal-200 to-lime-200 text-gray-900 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-lime-200 dark:focus:ring-teal-700"
                    >
                      Explore Countries
                    </Button>
                    <Link to="/about">
                      <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
                        Learn More
                      </Button>
                    </Link>
                  </div>

                  {/* Search Bar */}
                  <div className="mt-8 max-w-md">
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/20 flex items-center"
                    >
                      <input
                        type="text"
                        placeholder="Search for a country..."
                        className="flex-1 bg-transparent border-none outline-none focus:ring-0 focus:border-transparent px-4 py-2 text-white placeholder-gray-300"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                      />
                      <Button
                        type="submit"
                        pill
                        className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
                      >
                        Search
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Right Column - Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl mb-4">🌍</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Global Coverage
                    </h3>
                    <p className="text-gray-300">
                      Explore countries from every continent with comprehensive
                      data.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Detailed Stats
                    </h3>
                    <p className="text-gray-300">
                      Access population, economy, and cultural information for
                      each country.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Easy Search
                    </h3>
                    <p className="text-gray-300">
                      Find countries quickly with our intuitive search and
                      filter system.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl mb-4">🌐</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Interactive Maps
                    </h3>
                    <p className="text-gray-300">
                      Visualize country data with interactive maps and charts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Separate Features Section with its own background */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-4">
            Explore Our <span className="text-green-600">Features</span>
          </h2>
          <p className="text-xl text-center text-green-700 mb-12 max-w-3xl mx-auto">
            Discover all the powerful tools and features that make exploring
            countries easier and more enjoyable.
          </p>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Left - Man Image */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-green-500/20 rounded-2xl blur-xl"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-green-400/30">
                  <img
                    src="/man1.png"
                    alt="Explorer"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right - Scrollable Features */}
            <div className="w-full md:w-1/2">
              <div className="max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:bg-white/90 transition-all duration-300 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🗺️</div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Interactive World Map
                        </h3>
                        <p className="text-green-700">
                          Click on any country to view detailed information,
                          statistics, and cultural facts.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:bg-white/90 transition-all duration-300 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">📱</div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Mobile-Friendly Experience
                        </h3>
                        <p className="text-green-700">
                          Access our interactive features on any device,
                          anywhere in the world.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:bg-white/90 transition-all duration-300 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🔄</div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Real-Time Updates
                        </h3>
                        <p className="text-green-700">
                          Get the latest information about countries with our
                          regularly updated database.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:bg-white/90 transition-all duration-300 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">📊</div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Comprehensive Statistics
                        </h3>
                        <p className="text-green-700">
                          Access detailed statistics about population, economy,
                          education, and more.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:bg-white/90 transition-all duration-300 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🌍</div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Global Coverage
                        </h3>
                        <p className="text-green-700">
                          Explore information about all 195+ countries from
                          every continent.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-100 hover:bg-white/90 transition-all duration-300 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🔍</div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Advanced Search
                        </h3>
                        <p className="text-green-700">
                          Find countries quickly with our powerful search and
                          filter system.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Explore All Features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(16, 185, 129, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </div>
  );
};

export default HomePage;
