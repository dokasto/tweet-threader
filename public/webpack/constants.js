const path = require('path');

module.exports = {
  app: path.resolve(__dirname, '..', 'app/index.jsx'),
  build: path.resolve(__dirname, '..', 'public/build'),
  env: path.resolve(__dirname, '..', '..', '.env')
};
