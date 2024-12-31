import { Router } from "express";

import { getScore, getCurrentOver } from "../controllers/score.js";

const router = Router();

router.route("/get").get(getScore);
router.route("/currentOver").get(getCurrentOver);

export default router;
