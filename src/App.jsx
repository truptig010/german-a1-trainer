// src/App.jsx
import { useState } from "react";
import NounQuiz from "./components/NounQuiz";
import VerbQuiz from "./components/VerbQuiz";
import VerbMatchQuiz from "./components/VerbMatchQuiz";
import PerfektPartizip from "./components/PerfektPartizip";
export default function App() {
  const [activeTab, setActiveTab] = useState("noun");

  return (
<div style={{ padding: "30px 20px", maxWidth: "700px", margin: "auto", background: "#f7f9fc", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
  <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333", fontWeight: "500" }}>
    German A1 Trainer
  </h2>

  {/* -------- Tabs -------- */}
  <div style={{ display: "flex", gap: "12px", marginBottom: "25px" }}>
    {["noun", "verb", "match","perfekt"].map((tab) => {
      const labels = {
        noun: "Noun Quiz",
        verb: "Verb MCQ",
        match: "Match the Column",
        perfekt:"Perfekt Partzip"

      };
      const isActive = activeTab === tab;

      return (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: isActive ? "linear-gradient(145deg, #4dabf7, #1976d2)" : "#e0e0e0",
            color: isActive ? "white" : "#333",
            boxShadow: isActive
              ? "0 4px 10px rgba(25, 118, 210, 0.3)"
              : "0 2px 6px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = isActive
              ? "0 4px 10px rgba(25, 118, 210, 0.3)"
              : "0 2px 6px rgba(0,0,0,0.08)";
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

  );
}

