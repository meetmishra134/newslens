import { Router } from "express";
import { getUser } from "../controllers/user.controller";

const router = Router();
router.route("/me").get(getUser);

export default router;
