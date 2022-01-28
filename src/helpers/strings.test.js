import stringsModule from "./strings";
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  mermish: {},
};

describe("language string testing", () => {
  const mockWarn = jest.fn();
  let originalWarn;
  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });
  afterEach(() => {
    console.warn = originalWarn;
  });
  test("returns the correct submit string for English", () => {
    const string = getStringByLanguage("en", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalledWith();
  });

  test("returns the correct submit string for the Emoji language", () => {
    const string = getStringByLanguage("emoji", "submit", strings);
    expect(string).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalledWith();
  });

  test("returns the English submit string when provided language does not exist", () => {
    const string = getStringByLanguage("invalidLanguage", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      `Could not get string [submit] for [invalidLanguage]`
    );
  });

  test("returns the English submit string when the submit key does not exist for the provided language", () => {
    const string = getStringByLanguage("mermish", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      `Could not get string [submit] for [mermish]`
    );
  });
});
