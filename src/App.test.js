import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

jest.mock("./actions");
import { getSecretWord as mockGetSecretWord } from "./actions";

const setup = () => {
  return mount(<App />);
};

describe.each([
  [null, true, false],
  ["party", false, true],
])("renders with secretWord as %s", (secretWord, loadingShows, appShows) => {
  let wrapper;
  let originalUseReducer;
  beforeEach(() => {
    originalUseReducer = React.useReducer;

    const mockUseReducer = jest
      .fn()
      .mockReturnValue([{ secretWord }, jest.fn()]);
    React.useReducer = mockUseReducer;
    wrapper = setup();
  });
  afterEach(() => {
    React.useReducer = originalUseReducer;
  });
  test(`renders loading spinner: ${loadingShows}`, () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(loadingShows);
  });
  test(`renders App: ${appShows}`, () => {
    const app = findByTestAttr(wrapper, "component-app");
    expect(app.exists()).toBe(appShows);
  });
});

describe("getSecretWord", () => {
  beforeEach(() => {
    // clears mock calls from previous tests
    mockGetSecretWord.mockClear();
  });
  test("getSecretWord runs on app mount", () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test("getSecretWord does not run on app update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    // I'm using wrapper.setProps() because wrapper.update() doesn't trigger useEffect
    wrapper.setProps();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
