'use strict';

const app = require('./app/app');
const PORT = 3000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
