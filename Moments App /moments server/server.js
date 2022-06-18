const confrc = require("rc")("moments", {});
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors');

mongoose.connect(confrc.mongoUrl, { useNewUrlParser: true }, function (err) {
    if (err) {
      console.error(confrc.mongoUrl);
      console.error("Not connected to the database: " + err);
    } else {
      console.info("Successfully connected to remote MongoDB");
    }
  });

app.use(express.json())
app.use(cors())
require("./routes.js")(app);




const port = confrc.port || 3000
app.listen(port, () => console.log(`Listining on port ${port}`))