module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-flow'
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { modules: 'commonjs', debug: true }],
        '@babel/preset-flow'
      ],
    },
  },
};
