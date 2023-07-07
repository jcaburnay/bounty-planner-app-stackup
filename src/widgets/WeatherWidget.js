import React, { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { RiExchangeBoxFill } from "react-icons/ri";
import "../styles/styles.css";
import countries from "../countries.json";

const WEATHER_API_KEY = "b6422ce36f854eda9ae190853230507";
const API_NINJAS_KEY = "qDytCWpkhD14ZCqzjGrawA==V38qVajZrn5CKkKo";

export default function WeatherWidget() {
  const [unit, setUnit] = useState("celsius");
  const [coordinates, setCoordinates] = useState({});

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeQuote, setActiveQuote] = useState("");
  const [author, setAuthor] = useState("");

  const handleOnClickChangeUnit = () => {
    setUnit((prev) => {
      if (prev === "celsius") return "fahrenheit";
      return "celsius";
    });
  };

  const handleOnClickPrev = () => {
    if (index - 1 < 0) {
      setIndex(quotes.length - 1);
      setActiveQuote(quotes[quotes.length - 1].quote);
      setAuthor(quotes[quotes.length - 1].author);
    } else {
      setIndex(index - 1);
      setActiveQuote(quotes[index - 1].quote);
      setAuthor(quotes[index - 1].author);
    }
  };

  const handleOnClickNext = () => {
    if (index + 1 > 9) {
      setIndex(0);
      setActiveQuote(quotes[0].quote);
      setAuthor(quotes[0].author);
    } else {
      setIndex(index + 1);
      setActiveQuote(quotes[index + 1].quote);
      setAuthor(quotes[index + 1].author);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setCoordinates({ latitude, longitude });
        },
        function (error) {
          console.log("Error: " + error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (Object.entries(coordinates).length) {
      (async function fetchWeather() {
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${coordinates.latitude},${coordinates.longitude}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
          }

          const data = await response.json();
          setWeather(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [coordinates]);

  useEffect(() => {
    if (!quotes.length) {
      (async function fetchQuote() {
        try {
          const response = await fetch(
            "https://api.api-ninjas.com/v1/quotes?limit=10",
            {
              headers: {
                "X-Api-Key": API_NINJAS_KEY,
              },
            }
          );

          const data = await response.json();
          setQuotes(data);
          setActiveQuote(data[0].quote);
          setAuthor(data[0].author);
        } catch (error) {
          console.error("Error fetching quote:", error);
        }
      })();
    }
  }, [quotes.length]);

  if (loading) {
    return <div style={{ minWidth: 350 }}>Loading widget content...</div>;
  }

  if (error) {
    return <div style={{ minWidth: 350 }}>Something went wrong: {error}</div>;
  }

  return (
    <div style={{ minWidth: 300 }}>
      <div style={{ marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            {weather.location.name},{" "}
            {
              countries.find(
                (country) => country.name === weather.location.country
              ).code
            }
          </span>
          <button
            onClick={handleOnClickChangeUnit}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              textTransform: "capitalize",
              display: "flex",
            }}
          >
            <RiExchangeBoxFill />
            {unit === "celsius" ? (
              <TbTemperatureCelsius />
            ) : (
              <TbTemperatureFahrenheit />
            )}
          </button>
        </div>

        <img src={`${weather.current.condition.icon}`} alt="alt text" />
        <p>{weather.current.condition.text}</p>
        <p>
          Temperature:{" "}
          <span>
            {unit === "celsius"
              ? weather.current.temp_c
              : weather.current.temp_f}{" "}
            &deg;{unit === "celsius" ? "C" : "F"}
          </span>
        </p>
        <p>
          Feels like:{" "}
          <span>
            {unit === "celsius"
              ? weather.current.feelslike_c
              : weather.current.feelslike_f}{" "}
            &deg;{unit === "celsius" ? "C" : "F"}
          </span>
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          onClick={handleOnClickPrev}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <GrFormPrevious
            style={{ backgroundColor: "white", borderRadius: "50%" }}
          />
        </button>
        <blockquote style={{ width: 302, margin: "0 8px 0" }} cite={author}>
          {activeQuote}
        </blockquote>
        <button
          onClick={handleOnClickNext}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <GrFormNext
            style={{ backgroundColor: "white", borderRadius: "50%" }}
          />
        </button>
      </div>
    </div>
  );
}
