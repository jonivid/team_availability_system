const router = require("express").Router();
const userService = require("../service/user-service");
const logger = require("../utils/logger");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const verifyToken = require("../middleware/verify-token");
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const loginResult = await userService.login({ username, password });

    if (loginResult.success) {
      res.status(200).json({
        ...loginResult,
        message: "Login successful",
      });
    } else {
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/users", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { statusId = null, name = null } = req.query;
    let users;
    if (name || statusId) {
      users = await userService.getUsersByValue({ statusId, name, id });
    } else if (!statusId && !name) {
      console.log("get all");
      users = await userService.getAllUsers({ id });
    }
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
