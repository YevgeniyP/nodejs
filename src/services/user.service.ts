import { userRepository } from "../repositories/user.repository";
import { UserInterface } from "../types/user.interface";

class UserService {
  public async findAll(): Promise<UserInterface[]> {
    return await userRepository.findAll();
  }

  public async findById(userID: any): Promise<UserInterface | null> {
    return await userRepository.findById(userID);
  }

  public async create(user: UserInterface): Promise<UserInterface> {
    return await userRepository.create(user);
  }

  public async updateById(
    userID: any,
    user: UserInterface,
  ): Promise<UserInterface | null> {
    return await userRepository.updateById(userID, user);
  }

  public async deleteById(userID: any): Promise<UserInterface | null> {
    return await userRepository.deleteById(userID);
  }

  public async checkEmail(userEmail: string): Promise<UserInterface | null> {
    return await userRepository.checkEmail(userEmail);
  }
}

export const userService = new UserService();
