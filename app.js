const express = require("express");
const app = express();
const port = 3000;
const sequelize = require("./config/database");
const indexRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    // Authenticate the connection to the database
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync the database
    await sequelize.sync();
    console.log("Database synced successfully.");

    // Start the Express server
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
app.use("/", indexRouter);
