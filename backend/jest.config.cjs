module.exports = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",

    extensionsToTreatAsEsm: [".ts"],

    injectGlobals: true,

    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },

    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                useESM: true,
                tsconfig: "./tsconfig.jest.json"
            }
        ]
    },

    globals: {
        "ts-jest": {
            useESM: true
        }
    },

    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
};