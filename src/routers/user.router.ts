import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middleware/common.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.findAll);

router.get("/:id", commonMiddleware.validIdOrThrow, userController.findById);

router.post(
  "/",
  userMiddleware.emailRequireOrThrow,
  userMiddleware.bodyValidOrThrow(UserValidator.create),
  userController.create,
);

router.put(
  "/:id",
  userMiddleware.bodyValidOrThrow(UserValidator.update),
  commonMiddleware.validIdOrThrow,
  userController.updateById,
);

router.delete(
  "/:id",
  commonMiddleware.validIdOrThrow,
  userController.deleteById,
);

export const userRouter = router;
