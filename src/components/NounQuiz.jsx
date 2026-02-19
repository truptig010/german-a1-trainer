import { useState, useEffect } from "react";
import { chapters } from "../data/chapters";

function NounQuiz() {
  const chapterNames = Object.keys(chapters);

  const [currentChapter, setCurrentChapter] = useState(chapterNames[0]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [words, setWords] = useState([]);
  const [batchStart, setBatchStart] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const shuffled = shuffleArray(chapters[currentChapter]);
    setShuffledWords(shuffled);
    setBatchStart(0);
  }, [currentChapter]);

  useEffect(() => {
    if (shuffledWords.length === 0) return;

    const nextBatch = shuffledWords.slice(batchStart, batchStart + 20);

    if (nextBatch.length < 20) {
      const reshuffled = shuffleArray(chapters[currentChapter]);
      setShuffledWords(reshuffled);
      setBatchStart(0);
      return;
    }

    setWords(nextBatch);
    setIndex(0);
    setSelected("");
    setScore(0);
    setFinished(false);
  }, [shuffledWords, batchStart]);

  const formatGerman = (text) => {
    return text
      .replace(/ae/g, "ä")
      .replace(/oe/g, "ö")
      .replace(/ue/g, "ü")
      .replace(/Ae/g, "Ä")
      .replace(/Oe/g, "Ö")
      .replace(/Ue/g, "Ü");
//      .replace(/ss/g, "ß");
  };

  const checkAnswer = (answer) => {
    if (selected) return;
    setSelected(answer);
    if (answer === words[index].article) {
      setScore((prev) => prev + 1);
    }
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
    setBatchStart((prev) => prev + 20);
  };

  const totalWordsInChapter = chapters[currentChapter].length;
  const totalRounds = Math.ceil(totalWordsInChapter / 20);
  const currentRound = Math.floor(batchStart / 20) + 1;
  const progressPercent =
    words.length > 0 ? ((index + 1) / words.length) * 100 : 0;

  return (
    <div style={{
  padding: "20px",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  transition: "all 0.3s ease",
}}>
  
  <select
      value={currentChapter}
      onChange={(e) => setCurrentChapter(e.target.value)}
      style={{ margin: "15px 0", padding: "6px", borderRadius: "6px" }}
    >
      {chapterNames.map((ch) => (
        <option key={ch} value={ch}>
          {ch}
        </option>
      ))}
    </select>

    <div style={{ fontSize: "14px", marginBottom: "10px" }}>
      Round {currentRound} / {totalRounds}
    </div>

    {!finished ? (
      <>
        <div style={{ fontSize: "14px", marginBottom: "6px" }}>
          {index + 1} / {words.length}
        </div>

        <div
          style={{
            height: "8px",
            background: "#eee",
            borderRadius: "5px",
            overflow: "hidden",
            marginBottom: "20px"
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              background: "#4caf50",
              transition: "0.3s"
            }}
          />
        </div>

        <h3   style={{
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#1976d2"
  }}>{words[index] && formatGerman(words[index].word)} ({words[index]?.pronunciation}) </h3>




        {words[index] && (
          <div style={{ marginBottom: "20px", fontSize: "14px", color: "#555" }}>
            <div>{words[index].english}</div>

            <div>
              <strong>Plural:</strong> {formatGerman(words[index].plural)}

            </div>

          </div>
        )}

        <div>
          {["der", "die", "das"].map((art) => {
            let bg = "#e0e0e0";

            if (selected) {
              if (art === words[index].article) bg = "#4caf50";
              else if (art === selected) bg = "#f44336";
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
                  minWidth: "80px"
                }}
              >
                {art}
              </button>
            );
          })}
        </div>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Score: {score}
        </p>

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
            width: "100%"
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
            width: "100%"
          }}
        >
          Start Next Round
        </button>
      </>
    )}
  </div>
);

}

export default NounQuiz;
