import { User } from "../model/user";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { Response } from "express";

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
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  role: z.string().optional(),
});

export class AuthService {
  static async Register(user: UserType): Promise<UserType> {
    try {
      const validatedUser = userSchema.parse(user);
  
      const isEmailRegistered = await User.getUserByEmail(validatedUser.email);
      if (isEmailRegistered) {
        throw new Error("Email sudah terdaftar");
      }
  
      const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
  
      const isAdminEmail = ["admin1@gmail.com", "admin2@gmail.com"].includes(
        validatedUser.email
      );
      const role = isAdminEmail ? "admin" : "user";
  
      const createdUser = await User.createUser(
        validatedUser.username,
        validatedUser.email,
        hashedPassword,
        role
      );
  
      return {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        password: createdUser.password,
        role: createdUser.role,
      };
    } catch (error: any) {
      throw new Error(`Error saat membuat pengguna: ${error.message}`);
    }
  }
  

  static async Login(email: string, password: string): Promise<string> {
    try {
      const user = await User.getUserByEmail(email);
  
      if (!user) {
        throw new Error("Pengguna tidak ditemukan");
      }
  
      if (!user.password) {
        throw new Error("Kata sandi tidak ditemukan");
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        throw new Error("Kata sandi tidak valid");
      }
  
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
  
      const secret = process.env.JWT_SECRET;
  
      if (!secret) {
        throw new Error("Secret JWT tidak didefinisikan");
      }
  
      const token = jwt.sign(payload, secret, {
        expiresIn: "7d",
      });
  
      return token; // Mengembalikan token
    } catch (error: any) {
      throw new Error(`Error saat masuk: ${error.message}`);
    }
  }
  
  static async Logout(res: any): Promise<void> {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Berhasil keluar" });
      return;
    } catch (error: any) {
      throw new Error(`Error saat keluar: ${error.message}`);
    }
  }
}
