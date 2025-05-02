import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextInput,
  Select,
  Button,
  Label,
  Badge,
  Tooltip,
} from "flowbite-react";
import {
  fetchAllCountries,
  fetchCountriesByName,
  fetchCountriesByRegion,
  fetchCountryByCode,
} from "../services/Api";
import CountryCard from "../components/CountryCard";
import CountryDetailModal from "../components/CountryDetailModal";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SearchCountriesPage = () => {
  const [formData, setFormData] = useState({
    searchTerm: "",
    region: "",
    sortBy: "name",
    sortOrder: "asc",
  });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id || e.target.name]: e.target.value,
    }));
  };

  // Handle form submit and update URL
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.searchTerm) params.set("searchTerm", formData.searchTerm);
    if (formData.region) params.set("region", formData.region);
    navigate(`/searchCountries?${params.toString()}`);
  };

  // Apply filters to countries
  useEffect(() => {
    if (countries.length === 0) {
      setFilteredCountries([]);
      return;
    }

    let result = [...countries];

    // Apply sorting
    result.sort((a, b) => {
      if (formData.sortBy === "name") {
        return formData.sortOrder === "asc"
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      } else if (formData.sortBy === "population") {
        return formData.sortOrder === "asc"
          ? a.population - b.population
          : b.population - a.population;
      }
      return 0;
    });

    setFilteredCountries(result);
  }, [countries, formData.sortBy, formData.sortOrder]);

  // Fetch countries based on search term or region when the URL query changes.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get("searchTerm") || "";
    const region = params.get("region") || "";

    const fetchData = async () => {
      setLoading(true);
      try {
        if (searchTerm) {
          const data = await fetchCountriesByName(searchTerm);
          setCountries(data);
        } else if (region) {
          const data = await fetchCountriesByRegion(region);
          setCountries(data);
        } else {
          const data = await fetchAllCountries();
          setCountries(data);
        }
      } catch (err) {
        setCountries([]);
      }
      setLoading(false);
    };

    setFormData((prev) => ({
      ...prev,
      searchTerm,
      region,
    }));
    fetchData();
  }, [location.search]);

  // When a country is selected from the list, fetch full country details by code.
  const handleSelectCountry = async (code) => {
    const data = await fetchCountryByCode(code);
    setSelectedCountry(data[0]);
    setShowModal(true);
  };

  // Set sort option and order
  const handleSortChange = (sortOption) => {
    setFormData((prev) => ({
      ...prev,
      sortBy: sortOption,
    }));
  };

  // Set sort order explicitly
  const handleSortOrderChange = (order) => {
    setFormData((prev) => ({
      ...prev,
      sortOrder: order,
    }));
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col md:flex-row relative">
      {showSidebar ? (
        <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500 w-full md:w-1/4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <label className="font-semibold whitespace-nowrap">
                Country Name:
              </label>
              <TextInput
                id="searchTerm"
                type="text"
                placeholder="Search by name..."
                value={formData.searchTerm}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="font-semibold whitespace-nowrap">Region:</label>
              <Select
                name="region"
                value={formData.region}
                onChange={handleChange}
              >
                <option value="">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </Select>
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 text-gray-900 hover:bg-gradient-to-br focus:ring-lime-300 dark:focus:ring-lime-800"
            >
              FILTER
            </Button>
          </form>
        </div>
      ) : (
        <Button
          color="light"
          size="sm"
          onClick={toggleSidebar}
          className="absolute top-2 left-2 z-10"
        >
          Show Filters
        </Button>
      )}

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Search Results</h2>
            {!loading && countries.length > 0 && (
              <Badge color="success" className="text-xs md:text-sm mr-4">
                {countries.length}{" "}
                {countries.length === 1 ? "country" : "countries"} found
              </Badge>
            )}
          </div>

          <Button
            color="light"
            onClick={toggleFilters}
            size="sm"
            className="flex items-center gap-1"
          >
            Sort Options {showFilters ? <FaChevronUp /> : <FaChevronDown />}
          </Button>
        </div>

        {showFilters && (
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Sort by:
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="xs"
                    color={formData.sortBy === "name" ? "success" : "light"}
                    onClick={() => handleSortChange("name")}
                  >
                    Name
                  </Button>
                  <Button
                    size="xs"
                    color={
                      formData.sortBy === "population" ? "success" : "light"
                    }
                    onClick={() => handleSortChange("population")}
                  >
                    Population
                  </Button>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Order:
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="xs"
                    color={formData.sortOrder === "asc" ? "success" : "light"}
                    onClick={() => handleSortOrderChange("asc")}
                    className="flex items-center gap-1"
                  >
                    Ascending <FaChevronUp />
                  </Button>
                  <Button
                    size="xs"
                    color={formData.sortOrder === "desc" ? "success" : "light"}
                    onClick={() => handleSortOrderChange("desc")}
                    className="flex items-center gap-1"
                  >
                    Descending <FaChevronDown />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center font-medium text-gray-500">Loading...</p>
        ) : !countries || countries?.length === 0 ? (
          <p className="text-center font-medium text-gray-500">
            No countries found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCountries.length > 0
              ? filteredCountries.map((country) => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                    onSelect={() => handleSelectCountry(country.cca3)}
                  />
                ))
              : countries.map((country) => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                    onSelect={() => handleSelectCountry(country.cca3)}
                  />
                ))}
          </div>
        )}
      </div>

      {selectedCountry && (
        <CountryDetailModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          country={selectedCountry}
        />
      )}
    </div>
  );
};

export default SearchCountriesPage;
