import { userRepository } from "../repositories/user.repository";
import { UserInterface } from "../types/user.interface";

class UserService {
  public async findAll(): Promise<UserInterface[]> {
    return await userRepository.findAll();
  }

  public async findById(userID: any): Promise<UserInterface | null> {
    return await userRepository.findById(userID);
  }

  public async create(user: UserInterface) {
    return await userRepository.create(user);
  }

  public async updateById(userID: any, user: UserInterface) {
    return await userRepository.updateById(userID, user);
  }

  public async deleteById(userID: any) {
    return await userRepository.deleteById(userID);
  }
}

export const userService = new UserService();
