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
          <p key={index}>
            {item.word} - {item.origin}
          </p>
        ))}
      </Panel>
    </>
  );
}

export default App;
