import axios from "axios";
import { Panel } from "primereact/panel";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [wordResponse, setWordResponse] = useState([]);

  const handleSubmit = () => {
    if (wordResponse.length !== "") {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => {
          setWordResponse(response.data);
          console.log(response.data);
          setWord("");
        });
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
        <h3 style={{ display: isValid ? "block" : "none" }}>
          Your Word : " <i className="text-muted">{word}</i> "
        </h3>
        {wordResponse.map((item, index) => (
          <div key={index}>
            <h3>
              Phonetic:{" "}
              <i className="text-muted">
                {item.phonetics.find(
                  (phonetic) => phonetic.text && phonetic.text !== ""
                )?.text || "N/A"}
              </i>
            </h3>

            <div
              className="menu"
              style={{
                gridTemplateColumns: `repeat(${item.meanings.length},1fr)`,
              }}
            >
              {item.meanings.map((element, index) => (
                <h3 key={index}>
                  Part Of Spech : "{" "}
                  <i className="text-muted">{element.partOfSpeech}</i> "
                </h3>
              ))}
            </div>
          </div>
        ))}
        ;
      </Panel>
    </>
  );
}

export default App;
