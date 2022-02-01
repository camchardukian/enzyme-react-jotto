import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import Congrats from "./Congrats";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";

const setup = ({ success = false, language = "en" }) => {
  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe("languagePicker", () => {
  test("correctly renders congrats string in English", () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
  });

  test("correctly renders congrats string in Emoji language", () => {
    const wrapper = setup({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe("🎯🎉");
  });
});

test("renders without error", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when 'success' is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty congrats message when 'success' is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});
