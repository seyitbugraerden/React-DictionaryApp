import axios from "axios";
import { Panel } from "primereact/panel";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [wordResponse, setWordResponse] = useState([]);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = () => {
    if (word !== "") {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => {
          setWordResponse(response.data);
          setError("");
          setWord("");
        })
        .catch((error) => {
          setError("Word not found!");
          setWordResponse([]);
        });
    } else {
      setError("Please enter a word!");
    }
  };

  return (
    <>
      <Panel header="English Dictionary">
        <span className="p-float-label">
          <InputText
            id="username"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <label htmlFor="username">Your Word</label>
          <Button label="Search" onClick={handleSubmit} />
        </span>
        {error && <div className="error">{error}</div>}
        <div>
          <ul>
            {wordResponse.map((entry, index) => (
              <li key={index}>
                <strong>{entry.word}</strong>{" "}
                <i
                  onClick={() => {
                    setIsValid(!isValid);
                    const audio = new Audio(
                      entry.phonetics[0].audio ||
                        entry.phonetics[1].audio ||
                        entry.phonetics[2].audio ||
                        entry.phonetics[3].audio
                    );
                    audio.onended = () => {
                      setIsValid(isValid);
                    };
                    if (!isValid) {
                      audio.play();
                    } else {
                      audio.pause();
                    }
                  }}
                  className={
                    isValid
                      ? "bi bi-pause-circle-fill"
                      : "bi bi-play-circle-fill"
                  }
                ></i>
                {entry.meanings.map((meaning, index) => (
                  <div key={index}>
                    <p>
                      Part of Speech: <strong>{meaning.partOfSpeech}</strong>{" "}
                    </p>
                    <ul>
                      {meaning.definitions.map((definition, index) => (
                        <li key={index}>{definition.definition}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </>
  );
}

export default App;
