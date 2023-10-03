import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { ApiError } from "../errors/ApiError";
import { userService } from "../services/user.service";

class UserMiddleware {
  public bodyValidOrThrow(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);
        if (error) {
          throw new ApiError(400, error.message);
        }
        req.body = value;
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  public async emailRequireOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const email = await userService.checkEmail(req.body.email);
      if (email) {
        throw new ApiError(400, "Email isn't valid");
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const userMiddleware = new UserMiddleware();
