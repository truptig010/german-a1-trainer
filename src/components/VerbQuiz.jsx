// src/components/VerbQuiz.jsx
import { useState, useEffect } from "react";
import { verbs } from "../data/verbs";

const pronouns = ["ich", "du", "er/sie/es", "wir", "ihr", "sie"];

// -------------------- CONJUGATION --------------------
function conjugate(verb, pronoun) {
  if (verb.irregular && verb.irregular[pronoun]) {
    return verb.irregular[pronoun];
  }
  const stem = verb.infinitive.replace(/en$/, "");
  switch (pronoun) {
    case "ich":
      return stem + "e";
    case "du":
      return stem + "st";
    case "er/sie/es":
      return stem + "t";
    case "wir":
      return verb.infinitive;
    case "ihr":
      return stem + "t";
    case "sie":
      return verb.infinitive;
    default:
      return verb.infinitive;
  }
}

// -------------------- SHUFFLE UTILITY --------------------
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// -------------------- FORMAT FOR VERBS --------------------
// For verbs, we trust the data already has correct umlauts
const formatGermanVerb = (text) => text;

// -------------------- VERB QUIZ COMPONENT --------------------
export default function VerbQuiz() {
  const [shuffledVerbs, setShuffledVerbs] = useState([]);
  const [verbBatchStart, setVerbBatchStart] = useState(0);

  const [currentVerb, setCurrentVerb] = useState(null);
  const [currentPronoun, setCurrentPronoun] = useState("ich");
  const [verbOptions, setVerbOptions] = useState([]);
  const [verbSelected, setVerbSelected] = useState("");
  const [verbScore, setVerbScore] = useState(0);

  // ---------------- INITIAL SHUFFLE ----------------
  useEffect(() => {
    const shuffled = shuffleArray(verbs);
    setShuffledVerbs(shuffled);
    setVerbBatchStart(0);
  }, []);

  // ---------------- GENERATE QUESTION ----------------
  const generateVerbQuestion = () => {
    if (shuffledVerbs.length === 0) return;

    // Get current batch of 20
    const batch = shuffledVerbs.slice(verbBatchStart, verbBatchStart + 20);
    if (batch.length === 0) {
      // Reshuffle when batch exhausted
      const reshuffled = shuffleArray(verbs);
      setShuffledVerbs(reshuffled);
      setVerbBatchStart(0);
      return;
    }

    const randomVerb = batch[Math.floor(Math.random() * batch.length)];
    const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    const correct = conjugate(randomVerb, randomPronoun);

    const options = new Set([correct]);
    while (options.size < 4) {
      const randomP = pronouns[Math.floor(Math.random() * pronouns.length)];
      options.add(conjugate(randomVerb, randomP));
    }

    setCurrentVerb(randomVerb);
    setCurrentPronoun(randomPronoun);
    setVerbOptions(shuffleArray(Array.from(options)));
    setVerbSelected("");
  };

  // ---------------- INITIAL QUESTION ----------------
  useEffect(() => {
    if (shuffledVerbs.length > 0) generateVerbQuestion();
  }, [shuffledVerbs]);

  if (!currentVerb) return null;

  const correct = conjugate(currentVerb, currentPronoun);

  // ---------------- NEXT VERB ----------------
  const nextVerb = () => {
    if (verbBatchStart + 20 >= shuffledVerbs.length) {
      const reshuffled = shuffleArray(verbs);
      setShuffledVerbs(reshuffled);
      setVerbBatchStart(0);
    } else {
      setVerbBatchStart((prev) => prev + 20);
    }
    generateVerbQuestion();
  };

  // ---------------- ROUND INDICATOR ----------------
  const totalRounds = Math.ceil(shuffledVerbs.length / 20);
  const currentRound = Math.floor(verbBatchStart / 20) + 1;

  return (
    <div style={{
  padding: "20px",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  transition: "all 0.3s ease",
}}>
      <div style={{ fontSize: "14px", marginBottom: "10px" }}>
        Round {currentRound} / {totalRounds}
      </div>

      <h3 style={{ marginBottom: "15px" }}>
        {formatGermanVerb(currentVerb.infinitive)} ({currentVerb.english}) ({currentVerb.pronunciation}) :{" "}
        {currentPronoun} ____
      </h3>

      <div>
        {verbOptions.map((opt) => {
          let bg = "#e0e0e0";
          if (verbSelected) {
            if (opt === correct) bg = "#4caf50";
            else if (opt === verbSelected) bg = "#f44336";
          }

          return (
            <button
              key={opt}
              onClick={() => {
                if (verbSelected) return;
                setVerbSelected(opt);
                if (opt === correct) setVerbScore((prev) => prev + 1);
              }}
              style={{
                margin: "6px",
                padding: "12px 20px",
                fontSize: "16px",
                backgroundColor: bg,
                color: verbSelected ? "white" : "black",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                minWidth: "120px"
              }}
            >
              {formatGermanVerb(opt)}
            </button>
          );
        })}
      </div>

      <p style={{ marginTop: "15px", fontSize: "14px" }}>Score: {verbScore}</p>

      <button
        onClick={nextVerb}
        disabled={!verbSelected}
        style={{
          marginTop: "10px",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          background: verbSelected ? "#1976d2" : "#bbb",
          color: "white",
          cursor: verbSelected ? "pointer" : "not-allowed",
          width: "100%"
        }}
      >
        Next Verb
      </button>
    </div>
  );
}
