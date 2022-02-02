import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { findByTestAttr } from "../test/testUtils";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

import Congrats from "./Congrats";
import Input from "./Input";
import GuessedWords from "./GuessedWords";

const setup = ({ secretWord, guessedWords }) => {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Congrats />
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  // add value to input box
  const inputBox = findByTestAttr(wrapper, "input-box");
  inputBox.simulate("change", { target: { value: "train" } });

  // simulate click on submit button
  const submitButton = findByTestAttr(wrapper, "submit-button");
  submitButton.simulate("click", { preventDefault() {} });

  guessedWords.map((guess) => {
    const mockEvent = { target: { value: guess.guessedWord } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click", { preventDefault() {} });
  });

  return wrapper;
};

describe.skip("no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [],
    });
  });
  test("creates GuessedWords table with one row", () => {
    const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordRows).toHaveLength(0);
  });
});

describe.skip("some words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });
  });
  test("GuessedWords table should have additional rows after each guess", () => {
    const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordRows).toHaveLength(1);
    const inputBox = findByTestAttr(wrapper, "input-box");
    inputBox.simulate("change", { target: { value: "party" } });
    const guessedWordRows2 = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordRows2).toHaveLength(2);
  });
});

describe.skip("guess secret word", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });
    // initial number of rows based on state is correct
    const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordRows).toHaveLength(1);

    // adds value to input box
    const inputBox = findByTestAttr(wrapper, "input-box");
    inputBox.simulate("change", { target: { value: "party" } });

    // simulate submit button click
    const submitBtn = findByTestAttr(wrapper, "submit-button");
    submitBtn.simulate("click", { preventDefault() {} });
  });

  test("adds additional row to guessedWords table after guess", () => {
    const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordRows).toHaveLength(2);
  });

  test("displays congrats component", () => {
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.text().length).toBeGreaterThan(0);
  });

  test("does not display input component or submit button", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    expect(inputBox.exists()).toBe(false);

    const submitBtn = findByTestAttr(wrapper, "submit-button");
    expect(submitBtn.exists()).toBe(false);
  });
});
