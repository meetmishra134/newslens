import { Router } from "express";
import {
  getArticleById,
  getDefaultNews,
  getExploreNews,
  getTrendingNews,
  getuserFeed,
  markArticleAsRead,
} from "../controllers/news.controller";

const router = Router();
router.route("/").get(getDefaultNews);
router.route("/feed").get(getuserFeed);
router.route("/explore").get(getExploreNews);
router.route("/trending").get(getTrendingNews);
router.route("/:id").get(getArticleById);
router.route("/:articleId/read").post(markArticleAsRead);
export default router;
