'use strict';

const app = require('./app/app');
const initializer = require('./app/initializer');
const PORT = 3000;

initializer()
  .then(console.log)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
  })
  .catch(console.log);
