// src/components/PerfektPartizip.jsx
import { useState } from "react";

// Sample verbs array (replace with your full JSON)
import {verbsData} from "../data/perfektVerbs";

export default function PerfektPartizip() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const currentVerb = verbsData[currentIndex];

  const handleCheck = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setUserInput("");
    setCurrentIndex((prev) => (prev + 1) % verbsData.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setUserInput("");
    setCurrentIndex((prev) =>
      prev === 0 ? verbsData.length - 1 : prev - 1
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Verb Info */}
      <h3 style={{ marginBottom: "10px", color: "#1976d2" }}>
        {currentVerb.infinitive} – {currentVerb.english}
      </h3>
      <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "15px" }}>
        Pronunciation: {currentVerb.pronunciation}
      </p>

      {/* Input Box */}
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type Perfekt form (e.g., hat gemacht)"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "15px",
          fontSize: "1rem",
        }}
        disabled={showAnswer}
      />

      {/* Check / Next Buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        {!showAnswer ? (
          <button
            onClick={handleCheck}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#1976d2",
              color: "white",
              cursor: "pointer",
            }}
          >
            Check
          </button>
        ) : (
          <div style={{ flex: 1 }}>
            <p
              style={{
                padding: "10px",
                borderRadius: "8px",
                background: "#e0f0ff",
                textAlign: "center",
                color:
                  userInput.trim().toLowerCase() ===
                  currentVerb.perfekt.toLowerCase()
                    ? "green"
                    : "red",
                fontWeight: "500",
              }}
            >
              Correct: {currentVerb.perfekt}
            </p>
          </div>
        )}

        <button
          onClick={handlePrev}
          style={{
            flex: 0.5,
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#e0e0e0",
            cursor: "pointer",
          }}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          style={{
            flex: 0.5,
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#e0e0e0",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
