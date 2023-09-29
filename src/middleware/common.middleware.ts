import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { ApiError } from "../errors/ApiError";

class CommonMiddleware {
  public validIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) throw new ApiError(400, "ID isn't valid");
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
