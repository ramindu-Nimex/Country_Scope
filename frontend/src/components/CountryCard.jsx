import React from "react";

const CountryCard = ({ country, onSelect }) => (
  <div
    onClick={onSelect}
    className="rounded-lg shadow-md p-4 hover:shadow-xl cursor-pointer transition border border-teal-500"
  >
    <img
      src={country.flags.svg}
      alt={country.name.common}
      className="w-full h-40 object-cover rounded"
    />
    <h2 className="text-xl font-bold mt-2">{country.name.common}</h2>
    <p>
      <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
    </p>
    <p>
      <strong>Region:</strong> {country.region}
    </p>
    <p>
      <strong>Population:</strong> {country.population.toLocaleString()}
    </p>
    <p>
      <strong>Languages:</strong>{" "}
      {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
    </p>
  </div>
);

export default CountryCard;