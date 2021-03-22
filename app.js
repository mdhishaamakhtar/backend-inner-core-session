const express = require("express")
const app = express()
const db = require("./database/connection")

require('dotenv').config()

app.use(express.json())

db.authenticate()
  .then(() => {
    console.log('Connected To Database');
  })
  .catch(err => {
    console.log('An error occurred' + err);
    process.exit(2);
  });


app.get("/", (req, res) => {
  res.send("Hello Im up")
})

app.use("/api/v1/user", require('./routes/user'))

app.listen(process.env.PORT, () => {
  console.log("Server is up")
})