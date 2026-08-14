import { Router } from "express";
import { checkUser, syncUser } from "../controllers/auth.controller";

const router = Router();

router.route("/sync").post(syncUser);
router.route("/check").post(checkUser);
export default router;
