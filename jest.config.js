module.exports = {
    transform: {
        "^.+\\.[tj]sx?$": "ts-jest", // Transform TypeScript and JavaScript files
    },
    extensionsToTreatAsEsm: [".ts", ".tsx", ".js", ".jsx"], // Treat these extensions as ESM
    transformIgnorePatterns: [
        "/node_modules/(?!axios)" // Ensure axios is transformed
    ],
    testEnvironment: "jsdom", // Use jsdom for DOM-related tests
};