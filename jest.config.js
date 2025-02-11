/* eslint-disable @typescript-eslint/indent */
/* eslint-disable indent */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/main/**',
      '!<rootDir>/src/**/*-protocols.ts',
      '!**/protocols/**',
      '!**/test/**'
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    preset: '@shelf/jest-mongodb',
    transform: {
      '.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1'

    }
}
