import { User } from "../model/user";
import bcrypt from "bcrypt";
import { z } from "zod";

type UserType = {
  id: string;
  username: string;
  email: string;
  password: string;
  role?: string;
};

const userSchema = z.object({
  id: z.string(),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  role: z.string().optional(),
});

export class UserService {
  static async getUserById(id: string): Promise<UserType | undefined> {
    try {
      const user = await User.getUserById(id);
      return user;
    } catch (error: any) {
      throw new Error(`Error getting user by ID: ${error.message}`);
    }
  }

  static async getUsers(): Promise<UserType[]> {
    try {
      const users = await User.getUsers();
      return users;
    } catch (error: any) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }
  
  static async updateUser(user: UserType): Promise<UserType> {
    try {
      const validatedUser = userSchema.parse(user);

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

      // Update user
      const updatedUser = await User.updateUser(
        validatedUser.id,
        validatedUser.username,
        validatedUser.email,
        hashedPassword,
        validatedUser.role as string
      );
      return updatedUser;
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async deleteUser(id: string): Promise<void> {
    try {
      await User.deleteUser(id);
    } catch (error: any) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}
