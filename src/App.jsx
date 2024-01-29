import axios from "axios";
import { Panel } from "primereact/panel";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [wordResponse, setWordResponse] = useState([]);
  axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      setWordResponse(response.data);
      console.log(wordResponse);
    });

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
        </span>
      </Panel>
    </>
  );
}

export default App;
