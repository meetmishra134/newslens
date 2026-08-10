import { Router } from "express";
import { syncUser } from "../controllers/auth.controller";

const router = Router();

router.route("/sync").post(syncUser);

export default router;
