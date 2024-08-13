const router = require("express").Router();
const userService = require("../service/user-service");
const logger = require("../utils/logger");
const verifyToken = require("../middleware/verify-token");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

router.post("/login", async (req, res, next) => {
  try {
    const loginDetails = req.body;
    const result = await userService.login(loginDetails);
    res.status(200).json(result);
  } catch (error) {
    next(error); // Pass other errors to the default error handler
  }
});

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const { statusId = null, name = null } = req.query;
    let users;
    if (name || statusId) {
      users = await userService.getUsersByValue({ statusId, name });
    } else if (!statusId && !name) {
      users = await userService.getAllUsers();
    }
    res.status(200).json({
      users,
      userId: req.user.id,
    });
  } catch (e) {
    next(e);
  }
});
router.put("/", verifyToken, async (req, res, next) => {
  try {
    const { userId, statusId } = req.body;
    if (userId === req.user.id) {
      const updatedUser = await userService.updateUserStatusService(
        userId,
        statusId,
      );
      res.status(200).json({
        success: true,
        message: "User status updated successfully",
        userDetails: updatedUser,
      });
    } else {
      throw new ServerError({
        ...ErrorType.UNAUTHORIZED,
        message: "You are not authorized to update this user's status.",
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
