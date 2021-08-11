require('dotenv').config();
const mongoose = require("mongoose");

const connection_url = process.env.MONGO_DB_URL;

mongoose.Promise = global.Promise;

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

module.exports = mongoose;