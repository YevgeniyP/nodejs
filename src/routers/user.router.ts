import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middleware/common.middleware";

const router = Router();

router.get("/", userController.findAll);

router.get("/:id", commonMiddleware.validIdOrThrow, userController.findById);

router.post("/", userController.create);

router.put("/:id", commonMiddleware.validIdOrThrow, userController.updateById);

router.delete(
  "/:id",
  commonMiddleware.validIdOrThrow,
  userController.deleteById,
);

export const userRouter = router;
