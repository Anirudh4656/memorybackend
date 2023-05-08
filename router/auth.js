import express from "express";

const app = express()
const router = express.Router();
import { createPosts, likePost,deletePosts, commentPost,getPosts, getPost,updatePosts, getPostsBySearch } from "../controller/back.js";
import auth from "../middleware/auth.js";


router.get("/search",getPostsBySearch)
// router.post("/",createPosts)
router.post("/",auth,createPosts)
router.get("/:id",getPost)
router.get("/",getPosts);
router.patch("/:id",auth,updatePosts);
router.delete("/:id",auth,deletePosts);
router.patch("/:id/likePost",auth,likePost);
router.post("/:id/commentPost",auth,commentPost);

export default router;