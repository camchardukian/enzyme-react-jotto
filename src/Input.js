import React, { useContext } from "react";
import PropTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import stringsModule from "./helpers/strings";
import { getLetterMatchCount } from "./helpers";

const Input = ({ secretWord }) => {
  const language = useContext(languageContext);
  const [currentGuess, setCurrentGuess] = React.useState("");
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const [success, setSuccess] = successContext.useSuccess();
  if (success) {
    return <div data-test="component-input" />;
  }
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
            // update guessedWords
            const letterMatchCount = getLetterMatchCount(
              currentGuess,
              secretWord
            );
            const newGuessedWords = [
              ...guessedWords,
              { guessedWord: currentGuess, letterMatchCount },
            ];
            setGuessedWords(newGuessedWords);
            // update "success" if necessary
            if (currentGuess === secretWord) {
              setSuccess(true);
            }
            // clear input
            setCurrentGuess("");
          }}
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
