import { useEffect, useState } from "react";
import axios from "axios";

function CitySelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://location-selector.labs.crio.do/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    axios
      .get(
        `https://location-selector.labs.crio.do/country=${selectedCountry}/states`
      )
      .then((res) => {
        setStates(res.data);
        setSelectedState("");
        setCities([]);
        setSelectedCity("");
      })
      .catch((err) => console.error(err));
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) return;

    axios
      .get(
        `https://location-selector.labs.crio.do/country=${selectedCountry}/state=${selectedState}/cities`
      )
      .then((res) => {
        setCities(res.data);
        setSelectedCity("");
      })
      .catch((err) => console.error(err));
  }, [selectedCountry, selectedState]);

  return (
    <div style={{ padding: "20px" }}>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        value={selectedState}
        disabled={!selectedCountry}
        onChange={(e) => setSelectedState(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="" disabled>
          Select State
        </option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        disabled={!selectedState}
        onChange={(e) => setSelectedCity(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCity && selectedState && selectedCountry && (
        <p>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
}

export default CitySelector;
