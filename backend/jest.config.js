/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/spec/**/*.spec.ts', '**/spec/**/*.spec.js'],
    clearMocks: true
};
