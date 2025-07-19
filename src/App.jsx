import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const featureList = [
  { name: "fixed acidity", key: "fixed_acidity" },
  { name: "volatile acidity", key: "volatile_acidity" },
  { name: "citric acid", key: "citric_acid" },
  { name: "residual sugar", key: "residual_sugar" },
  { name: "chlorides", key: "chlorides" },
  { name: "free sulfur dioxide", key: "free_sulfur_dioxide" },
  { name: "total sulfur dioxide", key: "total_sulfur_dioxide" },
  { name: "density", key: "density" },
  { name: "pH", key: "pH" },
  { name: "sulphates", key: "sulphates" },
  { name: "alcohol", key: "alcohol" },
];

function App() {
  const [inputs, setInputs] = useState({
    fixed_acidity: "",
    volatile_acidity: "",
    citric_acid: "",
    residual_sugar: "",
    chlorides: "",
    free_sulfur_dioxide: "",
    total_sulfur_dioxide: "",
    density: "",
    pH: "",
    sulphates: "",
    alcohol: "",
  });
  const [quality, setQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQuality(null);
    try {
      const response = await axios.post(
        "https://wine-quality-predictor-2-op2n.onrender.com/predict",
        inputs
      );
      setQuality(response.data.quality);
    } catch (err) {
      setError("Failed to get prediction. Please check your input values.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wine-app-bg">
      {/* Decorative SVG background */}
      <svg className="wine-bg-svg" width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="700" cy="100" rx="120" ry="40" fill="#b43b4a22" />
        <ellipse cx="100" cy="500" rx="140" ry="50" fill="#6e183422" />
        <ellipse cx="400" cy="300" rx="200" ry="80" fill="#ffe06622" />
      </svg>
      <div className="wine-card wine-funky">
        <div className="wine-header-flex">
          {/* Funky wine glass SVG */}
          <span className="wine-glass-svg">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="24" cy="14" rx="12" ry="8" fill="#fff" stroke="#6e1834" strokeWidth="2"/>
              <path d="M12 14c0 8 4 18 12 18s12-10 12-18" stroke="#6e1834" strokeWidth="2" fill="#b43b4a"/>
              <rect x="22" y="32" width="4" height="10" rx="2" fill="#6e1834"/>
              <rect x="18" y="44" width="12" height="2" rx="1" fill="#b43b4a"/>
            </svg>
          </span>
          <h1 className="wine-title wine-funky-title">Wine Quality Predictor</h1>
          {/* Funky grapes SVG */}
          <span className="wine-grapes-svg">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="10" r="6" fill="#b43b4a" stroke="#6e1834" strokeWidth="1.5"/>
              <circle cx="12" cy="20" r="6" fill="#b43b4a" stroke="#6e1834" strokeWidth="1.5"/>
              <circle cx="28" cy="20" r="6" fill="#b43b4a" stroke="#6e1834" strokeWidth="1.5"/>
              <circle cx="20" cy="28" r="6" fill="#b43b4a" stroke="#6e1834" strokeWidth="1.5"/>
              <ellipse cx="20" cy="5" rx="2" ry="4" fill="#6e1834"/>
            </svg>
          </span>
        </div>
        <p className="wine-desc">Enter the wine's chemical features below and discover its predicted quality score! 🍇🍷</p>
        <form onSubmit={handleSubmit} className="wine-form wine-funky-form">
          {featureList.map((feature, idx) => (
            <div className="wine-form-group wine-funky-form-group" key={feature.key}>
              <label htmlFor={feature.key}>{feature.name}</label>
              <input
                type="number"
                step="any"
                id={feature.key}
                name={feature.key}
                value={inputs[feature.key]}
                onChange={handleChange}
                required
                className="wine-funky-input"
                placeholder={
                  idx % 2 === 0 ? `e.g. ${Math.random().toFixed(2)}` : `e.g. ${Math.random().toFixed(3)}`
                }
              />
            </div>
          ))}
          <button type="submit" className="wine-btn wine-funky-btn" disabled={loading}>
            {loading ? "Pouring..." : "Predict Quality"}
          </button>
        </form>
        {quality !== null && (
          <div className="wine-result wine-funky-result">
            <h2>Predicted Quality: <span>{quality}</span></h2>
            <p className="wine-quality-tip">{quality >= 7 ? "🍾 Excellent! This wine is top shelf." : quality >= 5 ? "🥂 Decent! Enjoy your glass." : "🍷 Needs improvement. Maybe let it age?"}</p>
          </div>
        )}
        {error && <div className="wine-error wine-funky-error">{error}</div>}
        <div className="wine-footer">Made with <span role="img" aria-label="love">❤️</span> for wine lovers</div>
      </div>
    </div>
  );
}

export default App;
