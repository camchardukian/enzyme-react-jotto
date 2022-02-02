import React from "react";
import languageContext from "./contexts/languageContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import stringsModule from "./helpers/strings";

const GuessedWords = () => {
  const language = React.useContext(languageContext);
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const hasGuessedWords = guessedWords.length > 0;
  return (
    <div data-test="component-guessed-words">
      {hasGuessedWords ? (
        <div data-test="guessed-words">
          <h3>{stringsModule.getStringByLanguage(language, "guessedWords")}</h3>
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>
                  {stringsModule.getStringByLanguage(
                    language,
                    "guessColumnHeader"
                  )}
                </th>
                <th>
                  {stringsModule.getStringByLanguage(
                    language,
                    "matchingLettersColumnHeader"
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {guessedWords.map((word, index) => {
                return (
                  <tr data-test="guessed-word" key={index}>
                    <td>{word.guessedWord}</td>
                    <td>{word.letterMatchCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <span data-test="guess-instructions">
          {stringsModule.getStringByLanguage(language, "guessPrompt")}
        </span>
      )}
    </div>
  );
};

export default GuessedWords;
