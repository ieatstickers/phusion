module.exports = {
  // moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  testMatch: ["**/tests/**/*.+(test.ts)"],
  // testPathIgnorePatterns: ["/node_modules/", "/bower_components/", "/lib/"],
  modulePathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: [ "./jest-setup.ts" ],
  // verbose: true,
  testURL: "http://www.example.com/"
};