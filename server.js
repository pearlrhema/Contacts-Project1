const express = require('express');
const app = express();
const contactRoutes = require("./routes/contacts");
const baseRoute = require("./routes/index");

const mongodb  = require("./data/database");
const bodyParser = require('body-parser');
// const baseRoute = require("./routes/index");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/contacts", contactRoutes);
app.use("/", baseRoute); 


mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Database Connection succesfull and Server is running on port ${port}`);
    });
  }
});