import PropTypes from "prop-types";

const GuessedWords = (props) => {
  const hasGuessedWords = props.guessedWords.length > 0;
  return (
    <div data-test="component-guessed-words">
      {hasGuessedWords ? (
        <div data-test="guessed-words">
          <h3>Guessed Words</h3>
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>Guess</th>
                <th>Matching Letters</th>
              </tr>
            </thead>
            <tbody>
              {props.guessedWords.map((word, index) => {
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
          Try to guess the secret word!
        </span>
      )}
    </div>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    }).isRequired
  ),
};

export default GuessedWords;
