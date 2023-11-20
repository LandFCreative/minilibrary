const cloudinary = require("../middleware/cloudinary");
const Library = require("../models/Library");

// const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      // Fine post by id
      const libraries = await Library.find({ user: req.user.id });
      res.render("profile.ejs", { libraries: libraries, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // feed=  librarysearch with a feed of each library
  getFeed: async (req, res) => {
    try {
      const libraries = await Library.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { libraries: libraries, user: req.user  }); 
    } catch (err) {
      console.log(err);
    }
  },

// get a list of the countries, then city

  getLibrary: async (req, res) => {
    try {
      const libraries = await Library.find().sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { libraries: libraries, user: req.user }); 

    } catch (err) {
      console.log(err);
    }
  },

    // post = Post each library

  getPost: async (req, res) => {
    try {
      const libraries = await Library.findById(req.params.id);
      // const comments = await Comment.find( {post: req.params.id} ).sort({ createdAt: "desc" }).lean();

      res.render("post.ejs", { libraries: libraries, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // profile = submit form for library
  createLibrary: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Library.create({
        name: req.body.name,
        address1: req.body.address1,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        // comments:comments.body.comments,
        isityours: false,
        user: req.user.id,
      });
      console.log("Library has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Library.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/library/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // deletePost: async (req, res) => {
  //   try {
  //     // Find post by id
  //     let library = await Library.findById({ _id: req.params.id });
  //     // Delete image from cloudinary
  //     await cloudinary.uploader.destroy(library.cloudinaryId);
  //     // Delete post from db
  //     await Library.remove({ _id: req.params.id });
  //     console.log("Deleted Library");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   } },
 }
