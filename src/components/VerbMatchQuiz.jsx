// src/components/VerbMatchQuiz.jsx
import { useState, useEffect } from "react";
import { verbs } from "../data/verbs";

export default function VerbMatchQuiz() {
  const [roundVerbs, setRoundVerbs] = useState([]);
  const [englishOptions, setEnglishOptions] = useState([]);
  const [selectedGerman, setSelectedGerman] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [matched, setMatched] = useState({});
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Start new round
  const startRound = () => {
    const selected = shuffle(verbs).slice(0, 5);
    setRoundVerbs(selected);
    setEnglishOptions(shuffle(selected.map(v => v.english)));
    setMatched({});
    setScore(0);
    setSelectedGerman(null);
    setSelectedEnglish(null);
  };

  useEffect(() => {
    startRound();
  }, []);

  // Matching logic
  useEffect(() => {
    if (selectedGerman && selectedEnglish) {
      const correct = selectedGerman.english === selectedEnglish;

      if (correct) {
        setMatched(prev => ({
          ...prev,
          [selectedGerman.infinitive]: selectedEnglish
        }));
        setScore(prev => prev + 1);
      }

      setTimeout(() => {
        setSelectedGerman(null);
        setSelectedEnglish(null);
      }, 400);
    }
  }, [selectedGerman, selectedEnglish]);

  return (
  <div style={{
  padding: "20px",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  transition: "all 0.3s ease",
}}>
    <h3 style={{ textAlign: "center" }}>Match the Words</h3>
    <p style={{ textAlign: "center" }}>Round {round}</p>

    <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
      
      {/* LEFT COLUMN - German */}
      <div style={{ flex: 1 }}>
        {roundVerbs.map((v) => {
          const isMatched = matched[v.infinitive];
          return (
            <button
              key={v.infinitive}
              onClick={() => !isMatched && setSelectedGerman(v)}
              disabled={isMatched}
              style={{
                display: "block",
                width: "100%",
                padding: "14px",
                marginBottom: "12px",
                borderRadius: "12px",
                border: "none",
                background: isMatched
                  ? "#4caf50"
                  : selectedGerman === v
                  ? "#1976d2"
                  : "#f1f1f1",
                color: isMatched || selectedGerman === v ? "white" : "black",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              {v.infinitive} ({v.pronunciation})
            </button>
          );
        })}
      </div>

      {/* RIGHT COLUMN - English */}
      <div style={{ flex: 1 }}>
        {englishOptions.map((eng) => {
          const isMatched = Object.values(matched).includes(eng);
          return (
            <button
              key={eng}
              onClick={() => !isMatched && setSelectedEnglish(eng)}
              disabled={isMatched}
              style={{
                display: "block",
                width: "100%",
                padding: "14px",
                marginBottom: "12px",
                borderRadius: "12px",
                border: "none",
                background: isMatched
                  ? "#4caf50"
                  : selectedEnglish === eng
                  ? "#1976d2"
                  : "#f1f1f1",
                color: isMatched || selectedEnglish === eng ? "white" : "black",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              {eng} {}
            </button>
          );
        })}
      </div>

    </div>

    <p style={{ textAlign: "center", marginTop: "20px" }}>
      Score: {score} / 5
    </p>

    {score === 5 && (
      <button
        onClick={() => {
          setRound(prev => prev + 1);
          startRound();
        }}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          background: "#1976d2",
          color: "white",
          marginTop: "15px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Next Round
      </button>
    )}
  </div>
);

}
