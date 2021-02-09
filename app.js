const express = require("express");
const db = require("./db/models");
const eventRouts = require("./routes/events");
const PORT = 8000;
const app = express();

app.use(express.json());
app.use("/events", eventRouts);

//Sync DB and listen to port
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
  });
};

run();
