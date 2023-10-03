import { User } from "../models/User.model";
import { UserInterface } from "./../types/user.interface";

class UserRepository {
  public async findAll(): Promise<UserInterface[]> {
    return await User.find();
  }

  public async findById(userId: string): Promise<UserInterface | null> {
    return await User.findById(userId);
  }

  public async create(createUser: UserInterface): Promise<UserInterface> {
    return await User.create(createUser);
  }

  public async updateById(
    userId: string,
    updateUser: UserInterface,
  ): Promise<UserInterface | null> {
    return await User.findByIdAndUpdate(userId, updateUser, {
      returnDocument: "after",
    });
  }

  public async deleteById(userId: string): Promise<UserInterface | null> {
    return await User.findByIdAndDelete(userId);
  }

  public async checkEmail(userEmail: string): Promise<UserInterface | null> {
    return await User.findOne({ email: userEmail });
  }
}

export const userRepository = new UserRepository();
