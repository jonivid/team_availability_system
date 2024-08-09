const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userController = require("./controller/user-controller");
const statusController = require("./controller/status-controller");
const logger = require("./utils/logger");
const errorHandler = require("./errors/error-handler");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userController);
app.use("/status", statusController);
app.use(errorHandler);

const port = process.env.REST_PORT;
app.listen(port, () => {
  logger.info(`Server is running on port ${process.env.REST_PORT}`);
});
