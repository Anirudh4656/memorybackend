import express from "express";
import { shortUrl ,Url} from "../controller/short.js";
// import { shortUrl } from "../controller/user.js";
const app = express()

const router = express.Router();

router.post("/ShortUrl",shortUrl);
router.get("/ShortUrl",Url);
// router.post("/signup",signup)



export default router;