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
  test("state updated with value of input box upon change", () => {
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
});
