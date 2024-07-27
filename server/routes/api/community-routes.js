// ----------------------------------------------------------------------------------
// Imports Express router and follow-controllers
const router = require("express").Router();
const communityController = require("../../controllers/community-controller");
const withAuth = require("../../helpers/auth");

// ----------------------------------------------------------------------------------
// Routes
router.post("/addCommunity", withAuth.auth, communityController.addComunity);
router.post("/follow", withAuth.auth, communityController.followComunity);
router.post("/unfollow", withAuth.auth, communityController.removeFollow);
router.get("/getAll", withAuth.auth, communityController.getCommunities);
router.get("/getOne/:id", withAuth.auth, communityController.getCommunity);

// Export the router
module.exports = router;
