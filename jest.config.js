// module.exports = {
//     transform: {
//       "^.+\\.jsx?$": "babel-jest",
//     },
//     transformIgnorePatterns: [
//       "/node_modules/(?!axios)", // Include axios for transformation
//     ],
//   };
module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest' // Use babel-jest to transform JavaScript files
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)' // Allow axios and other ES module packages to be transpiled
    ],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS imports for tests
      '\\.(svg|jpg|png)$': '<rootDir>/__mocks__/fileMock.js' // Mock static file imports
    },
    moduleNameMapper: {
  '^axios$': '<rootDir>/node_modules/axios/lib/axios.js',
},
moduleNameMapper: {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
},
    testEnvironment: 'jsdom' // Ensure that Jest uses jsdom for DOM-related testing (React apps)
  };
  // module.exports = {
  //   // ... other configurations ...
  //   moduleNameMapper: {
  //     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  //   },
  // };