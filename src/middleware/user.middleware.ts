import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/ApiError";
import { userService } from "../services/user.service";
import { UserValidator } from "../validators/user.validator";

class UserMiddleware {
  public bodyValidOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(400, error.message);
      }
      req.body = value;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async emailRequireOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const email = await userService.checkEmail(req.body.email);
      if (email) {
        throw new ApiError(400, "Email Require");
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const userMiddleware = new UserMiddleware();
