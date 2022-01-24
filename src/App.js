import { useEffect, useState } from "react";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";
function App() {
  const [secretWord, setSecretWord] = useState("");

  // @TODO -- Get props from state after implementing Context
  const success = false;
  const guessedWords = [];

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);
  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
