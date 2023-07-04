const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Register employee routes
app.use('/employees', employeeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
