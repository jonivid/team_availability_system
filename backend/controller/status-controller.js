const verifyToken = require("../middleware/verify-token");
const statusService = require("../service/status-service");

const router = require("express").Router();

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const statusList = await statusService.getStatusList();
    res.status(200).json(statusList);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
