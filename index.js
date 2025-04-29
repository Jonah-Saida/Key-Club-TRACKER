const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
require('dotenv').config(); 

const port = process.env.PORT || 3000;
const authKey = process.env.AUTH_KEY;

const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((file) => {
  const route = require(path.join(routesPath, file));
  const routeName = '/' + file.split('.')[0];

  app.use(routeName, route);

  console.log(`Loaded route: ${routeName}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
