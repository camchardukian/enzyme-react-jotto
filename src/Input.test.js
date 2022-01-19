import { shallow } from "enzyme";
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
