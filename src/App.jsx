import { useState, useEffect } from "react";
import { chapters } from "./data/chapters";

function App() {
  const chapterNames = Object.keys(chapters);

  const [currentChapter, setCurrentChapter] = useState(chapterNames[0]);
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Load 20 random questions
  useEffect(() => {
    const shuffled = [...chapters[currentChapter]].sort(
      () => Math.random() - 0.5
    );

    const quizSet = shuffled.slice(0, 20);

    setWords(quizSet);
    setIndex(0);
    setSelected("");
    setScore(0);
    setFinished(false);
  }, [currentChapter]);

  const checkAnswer = (answer) => {
    if (selected) return;

    setSelected(answer);

    if (answer === words[index].article) {
      setScore((prev) => prev + 1);
    }
  };
  const formatGerman = (text) => {
  return text
    .replace(/ae/g, "ä")
    .replace(/oe/g, "ö")
    .replace(/ue/g, "ü")
    .replace(/Ae/g, "Ä")
    .replace(/Oe/g, "Ö")
    .replace(/Ue/g, "Ü")
    .replace(/ss/g, "ß");
};


  const nextWord = () => {
    if (index + 1 < words.length) {
      setIndex((prev) => prev + 1);
      setSelected("");
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    const shuffled = [...chapters[currentChapter]].sort(
      () => Math.random() - 0.5
    );

    const quizSet = shuffled.slice(0, 20);

    setWords(quizSet);
    setIndex(0);
    setSelected("");
    setScore(0);
    setFinished(false);
  };

  const progressPercent =
    words.length > 0 ? ((index + 1) / words.length) * 100 : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f9",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>German A1 Trainer</h2>

        {/* Chapter Selector */}
        <select
          value={currentChapter}
          onChange={(e) => setCurrentChapter(e.target.value)}
          style={{
            margin: "15px 0",
            padding: "6px",
            borderRadius: "6px",
          }}
        >
          {chapterNames.map((ch) => (
            <option key={ch} value={ch}>
              {ch}
            </option>
          ))}
        </select>

        {!finished ? (
          <>
            {/* Progress */}
            <div style={{ fontSize: "14px", marginBottom: "6px" }}>
              {index + 1} / {words.length}
            </div>

            <div
              style={{
                height: "8px",
                background: "#eee",
                borderRadius: "5px",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background: "#4caf50",
                  transition: "0.3s",
                }}
              />
            </div>

            {/* Word (ONLY noun shown) */}
            <h3 style={{ marginBottom: "20px" }}>              
              {words[index] && formatGerman(words[index].word)}
            </h3>

            {/* Article Buttons */}
            <div>
              {["der", "die", "das"].map((art) => {
                let bg = "#e0e0e0";

                if (selected) {
                  if (art === words[index].article) {
                    bg = "#4caf50";
                  } else if (art === selected) {
                    bg = "#f44336";
                  }
                }

                return (
                  <button
                    key={art}
                    onClick={() => checkAnswer(art)}
                    style={{
                      margin: "6px",
                      padding: "12px 20px",
                      fontSize: "16px",
                      backgroundColor: bg,
                      color: selected ? "white" : "black",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      minWidth: "80px",
                    }}
                  >
                    {art}
                  </button>
                );
              })}
            </div>

            {/* Score */}
            <p style={{ marginTop: "15px", fontSize: "14px" }}>
              Score: {score}
            </p>

            {/* Next Button */}
            <button
              onClick={nextWord}
              disabled={!selected}
              style={{
                marginTop: "10px",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: selected ? "#1976d2" : "#bbb",
                color: "white",
                cursor: selected ? "pointer" : "not-allowed",
                width: "100%",
              }}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h3>🎉 Quiz Finished!</h3>
            <p>
              Final Score: {score} / {words.length}
            </p>
            <button
              onClick={resetQuiz}
              style={{
                marginTop: "15px",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#1976d2",
                color: "white",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Start New 20 Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}


export default App;
