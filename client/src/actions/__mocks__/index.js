module.exports = {
    ...jest.requireActual(".."),
    __esModule: true,
    signIn: jest.fn().mockReturnValue({ type: "mock" }),
    // getSecretWord: jest.fn().mockReturnValue({ type: "mock" }),
};

