// src/App.jsx
import { useState } from "react";
import NounQuiz from "./components/NounQuiz";
import VerbQuiz from "./components/VerbQuiz";
import VerbMatchQuiz from "./components/VerbMatchQuiz";
import PerfektPartizip from "./components/PerfektPartizip";
export default function App() {
  const [activeTab, setActiveTab] = useState("noun");

return (
  <div
    style={{
      minHeight: "100dvh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#eef3fb",
      padding: "16px",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        padding: "24px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#1976d2",
          fontWeight: "600",
        }}
      >
        German A1 Trainer
      </h2>

      {/* -------- Tabs -------- */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {["noun", "verb", "match", "perfekt"].map((tab) => {
          const labels = {
            noun: "Nouns",
            verb: "Verbs",
            match: "Match",
            perfekt: "Perfekt",
          };

          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "12px",
                border: "none",
                background: isActive
                  ? "linear-gradient(145deg, #4dabf7, #1976d2)"
                  : "#e0e0e0",
                color: isActive ? "white" : "#333",
                boxShadow: isActive
                  ? "0 4px 10px rgba(25,118,210,0.3)"
                  : "0 2px 6px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* -------- Tab Content -------- */}
      {activeTab === "noun" && <NounQuiz />}
      {activeTab === "verb" && <VerbQuiz />}
      {activeTab === "match" && <VerbMatchQuiz />}
      {activeTab === "perfekt" && <PerfektPartizip />}
    </div>
  </div>
);
  
}

