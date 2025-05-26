const express = require('express');
const app = express();
// const contactRoutes = require("./routes/contacts");
// const baseRoute = require("./routes/index");

const mongodb  = require("./data/database");
const bodyParser = require('body-parser');
// const baseRoute = require("./routes/index");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/contacts", contactRoutes);
app.use("/", require("./routes")); 


process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.id, `Caught Exceptions: ${err}\n` + ` Exception Origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Database Connection succesfull and Server is running on port ${port}`);
    });
  }
});