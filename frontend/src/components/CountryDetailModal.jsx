import React from "react";
import { Modal, Button } from "flowbite-react";

const CountryDetailModal = ({ showModal, onClose, country }) => {
  if (!country) return null;

  const {
    flags,
    name,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    timezones,
    startOfWeek,
    independent,
    tld,
    cca2,
    cca3,
    status,
  } = country;

  return (
    <Modal show={showModal} onClose={onClose} size="lg" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center space-y-4 backdrop:blur-sm bg-white dark:bg-gray-800 rounded-lg p-6 shadow-2xl">
          {/* Flag */}
          {flags?.svg ? (
            <img
              src={flags.svg}
              alt={name?.common || "Country Flag"}
              className="w-full h-48 object-cover rounded"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center text-gray-500 bg-gray-100 dark:bg-gray-700 rounded">
              No Flag Available
            </div>
          )}

          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {name?.common || "Unknown Country"}
          </h2>

          {/* Details */}
          <div className="text-left space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Capital:</strong> {capital?.[0] || "N/A"}
            </p>
            <p>
              <strong>Region:</strong> {region || "N/A"}
            </p>
            <p>
              <strong>Subregion:</strong> {subregion || "N/A"}
            </p>
            <p>
              <strong>Population:</strong>{" "}
              {population?.toLocaleString() || "N/A"}
            </p>
            <p>
              <strong>Area:</strong>{" "}
              {area ? `${area.toLocaleString()} km²` : "N/A"}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {languages ? Object.values(languages).join(", ") : "N/A"}
            </p>
            <p>
              <strong>Timezone:</strong> {timezones?.[0] || "N/A"}
            </p>
            <p>
              <strong>Start of Week:</strong> {startOfWeek || "N/A"}
            </p>
            <p>
              <strong>Independent:</strong>{" "}
              {independent === true
                ? "Yes"
                : independent === false
                ? "No"
                : "Unknown"}
            </p>
            <p>
              <strong>Status:</strong> {status || "N/A"}
            </p>
            <p>
              <strong>Top-Level Domain:</strong> {tld?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Country Codes:</strong>{" "}
              {`CCA2: ${cca2 || "N/A"}, CCA3: ${cca3 || "N/A"}`}
            </p>
          </div>

          {/* Close Button */}
          <div className="pt-4 flex justify-center">
            <Button
              className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 text-gray-900 hover:bg-gradient-to-br focus:ring-lime-300 dark:focus:ring-lime-800"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CountryDetailModal;