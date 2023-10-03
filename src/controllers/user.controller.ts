import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/ApiError";
import { userService } from "../services/user.service";
// import { UserInterface } from "../types/user.interface";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const users = await userService.findAll();

    res.json(users);
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const currentUser = await userService.findById(id);

      res.json(currentUser);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const newUser = await userService.create(req.body);
      if (!newUser) {
        throw new ApiError(400, "");
      }

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const currentUser = await userService.updateById(id, req.body);
      if (!currentUser) {
        throw new ApiError(404, "User not found");
      }

      res.status(201).json(currentUser);
    } catch (error) {
      next(error);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const currentUser = await userService.deleteById(id);
      if (!currentUser) {
        throw new ApiError(404, "User not found");
      }

      res.status(204).json(currentUser);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
