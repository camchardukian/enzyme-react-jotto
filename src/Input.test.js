import { shallow } from "enzyme";
import React from "react";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";

const setup = (secretWord = "hello") => {
  return shallow(<Input secretWord={secretWord} />);
};

test("does not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "hello" });
});

test("renders without error", () => {
  const wrapper = setup({ secretWord: "train" });
  const component = findByTestAttr(wrapper, "input-component");
  expect(component.length).toBe(1);
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = () => ["", mockSetCurrentGuess];
    wrapper = setup();
  });

  afterEach(() => {
    React.useState = originalUseState;
  });

  test("state updated with value of input box upon change", () => {
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  test("currentGuess is updated to be empty string after submitting", () => {
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    const wrapper = setup();

    const submitBtn = findByTestAttr(wrapper, "submit-button");
    submitBtn.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
