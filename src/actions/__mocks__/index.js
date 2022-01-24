module.exports = {
  ...jest.requireActual(".."),
  __esModule: true,
  // @TODO -- update return value after implementing Context
  getSecretWord: jest.fn().mockReturnValue(Promise.resolve("party")),
};
