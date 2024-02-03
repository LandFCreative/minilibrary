const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const librariesController = require("../controllers/libraries");
const { ensureAuth } = require("../middleware/auth");

//Main Routes - simplified for now
// ensureAuth ensures people are logged in. Don't need if you don't want them logged in.
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, librariesController.getProfile);
router.get("/feed", ensureAuth, librariesController.getFeed);
router.get("/location", ensureAuth, librariesController.getLocation);

// router.get("/librarypost", ensureAuth, librariesController.getLibrary);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
// router.get("/contact", authController.getContact);

module.exports = router;
