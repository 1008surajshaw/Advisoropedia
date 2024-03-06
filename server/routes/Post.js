const express =require("express");
const router =express.Router()

const {
    createPost,getFullPostDetails,showAllPost,getUserPost
} = require("../controllers/Post")

const {auth} = require("../middlewares/auth")

router.post("/createpost",auth,createPost);

router.get("/getpostdetails",getFullPostDetails);

router.get("/allposts",showAllPost);

router.get("/getuserpost",auth,getUserPost)

module.exports = router
