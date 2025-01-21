export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.spec.json",
      },
    ],
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/src/config/jest/styleMock.ts",
    /* mock models and services folder */
    "(assets|models|services)": "<rootDir>/src/config/jest/fileMock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  verbose: true,
};
