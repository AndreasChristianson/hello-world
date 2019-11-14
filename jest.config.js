module.exports = {
    verbose: true,
    collectCoverageFrom: [
        'src/**/*.js',
        '!**/*.spec.js'
    ],
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    setupFilesAfterEnv: [
        '<rootDir>/src/test-setup.js'
    ],
    testEnvironment: 'node',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
