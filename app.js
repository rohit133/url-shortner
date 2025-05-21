require("dotenv").config();
const express = require("express");
const routes = require('./routes/index')
const mongooes = require("mongoose");

const app = express();
const PORT = process.env.PORT;
const dbUri = process.env.MONGO_URI;

app.use(express.json());

app.use('/api', routes)

mongooes
  .connect(dbUri)
  .then(() => {
    console.log(`✅ dbconnection established successfully`);
    app.listen(8080, (error) => {
      if (!error) {
        console.log(`✅ App listening to port :${PORT || 8080}`);
      } else {
        console.log(`Error while starting the app ${error}`);
      }
    });
  })
  .catch((error) => console.log(`❌ dbconnection failed \n${error}`));
