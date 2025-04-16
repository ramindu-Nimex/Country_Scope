import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextInput, Select, Button } from "flowbite-react";
import {
  fetchAllCountries,
  fetchCountriesByName,
  fetchCountriesByRegion,
  fetchCountryByCode,
} from "../services/Api";
import CountryCard from "../components/CountryCard";
import CountryDetailModal from "../components/CountryDetailModal";

const SearchCountriesPage = () => {
  const [formData, setFormData] = useState({
    searchTerm: "",
    region: "",
  });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

    setFormData({ searchTerm, region });
    fetchData();
  }, [location.search]);

  // When a country is selected from the list, fetch full country details by code.
  const handleSelectCountry = async (code) => {
    const data = await fetchCountryByCode(code);
    setSelectedCountry(data[0]);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row">
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
            SEARCH
          </Button>
        </form>
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        {loading ? (
          <p className="text-center font-medium text-gray-500">Loading...</p>
        ) : !countries || countries?.length === 0 ? (
          <p className="text-center font-medium text-gray-500">
            No countries found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries?.map((country) => (
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
