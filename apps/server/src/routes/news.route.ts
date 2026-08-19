import { Router } from "express";
import { getuserFeed } from "../controllers/news.controller";

const router = Router();
router.route("/").get(getuserFeed);

export default router;
