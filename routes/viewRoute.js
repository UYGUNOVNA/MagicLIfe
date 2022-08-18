const expres = require("express");
const { route } = require("./paymentRoute");
const viewController = require("./../controller/viewController");
const router = expres.Router();

router.route("/kassa").get(viewController.openKassa);
router.route("/save-kassa-data").get(viewController.saveDataKassa);

module.exports = router;
router.route;
