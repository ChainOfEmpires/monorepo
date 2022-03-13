module.exports = function override(config) {
  config.module.rules.push({
    type: 'javascript/auto',
    test: /\.mjs$/,
    use: [],
  });

  return config;
};
