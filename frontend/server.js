require('dotenv').config();
const express = require('express');
      errorHandler = require('./app/helpers/error-handler');
      app = express();
      cors = require('cors');
      bodyParser = require('body-parser');
      cookieParser = require('cookie-parser');
      port = process.env.PORT;
      user = require('./app/routes/user');
      
// global error handler
app.use(errorHandler);
app.use(cors());
      
// connect database
const mongoose = require("./app/database/mongoose");

// essential setup for communication
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// base url
app.get('/', (req, res)=>{
     res.json('welcome').status(200);
  });

user(app);

app.listen(port, ()=> console.log(`e-commerce API is listening on port ${port}`));
