import { Router } from "express";
import {
  createOver,
  updateBallOutcome,
  getOver,
  getAllOvers,
} from "../controllers/over.js";

const router = Router();

router.route("/create").post(createOver);
router.route("/update").post(updateBallOutcome);
router.route("/get/:overNumber").get(getOver);
router.route("/getAll").get(getAllOvers);

export default router;
