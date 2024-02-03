const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const librariesController = require("../controllers/libraries");
const { ensureAuth } = require("../middleware/auth");

//Post Routes - simplified for now
// Since linked from server js treat each path as :
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id
router.get("/:id", ensureAuth, librariesController.getPost);
 
// Enables user to create post W/ cloudinary for media uploads
router.post("/createLibrary", upload.single("file"), librariesController.createLibrary);

// Enables user to link post. In Controller, use POST modal to update likes by 1.
router.put("/likeLibrary/:id", librariesController.likeLibrary);

// Enables user to delete post. In Controller, use POST modal to delete post from MongoDB collection.
router.delete("/deleteLibrary/:id", librariesController.deleteLibrary);

module.exports = router;
 