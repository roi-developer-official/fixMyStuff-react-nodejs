module.exports = {
  ...jest.requireActual("../authAction"),
  __esModule: true,
  signIn: jest.fn().mockReturnValue({ type: "mock" }),
  actionFailed: jest.fn().mockReturnValue({ type: "mock" }),
  // getSecretWord: jest.fn().mockReturnValue({ type: "mock" }),
};
