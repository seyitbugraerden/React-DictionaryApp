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
        {wordResponse.map((item, index) => (
          <div key={index}>
            <h3>
              Your Word : " <i className="text-muted">{item.word}</i> "
            </h3>
            <h3>
              Phonetic : " <i className="text-muted">{item.phonetic}</i> "
            </h3>
            {item.meanings.map((element, index) => (
              <h3 key={index}>
                Part Of Spech : "{" "}
                <i className="text-muted">{element.partOfSpeech}</i> "
              </h3>
            ))}
            <audio
              id="track1"
              src={item.phonetics[1].audio}
              controls="1"
            ></audio>
          </div>
        ))}
      </Panel>
    </>
  );
}

export default App;
