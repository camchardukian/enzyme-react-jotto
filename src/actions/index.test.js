import moxios from "moxios";
import { getSecretWord } from "./";

describe("getSecretWord", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.install();
  });
  test("secretWord is returned", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "party",
      });
    });
    // update test once we've added Context to the app.
    return getSecretWord().then((secretWord) => {
      expect(secretWord).toBe("party");
    });
  });
});
