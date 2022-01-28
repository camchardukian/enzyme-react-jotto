import stringsModule from "./strings";
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  mermish: {},
};
test("returns the correct submit string for English", () => {
  const string = getStringByLanguage("en", "submit", strings);
  expect(string).toBe("submit");
});

test("returns the correct submit string for the Emoji language", () => {
  const string = getStringByLanguage("emoji", "submit", strings);
  expect(string).toBe("🚀");
});

test("returns the English submit string when provided language does not exist", () => {
  const string = getStringByLanguage("invalidLanguage", "submit", strings);
  expect(string).toBe("submit");
});

test("returns the English submit string when the submit key does not exist for the provided language", () => {
  const string = getStringByLanguage("mermish", "submit", strings);
  expect(string).toBe("submit");
});
