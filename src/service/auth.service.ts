import { User } from "../model/user";
import { UserType } from "../types/userType";
import { userValidation } from "../validation/userValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";

export class AuthService {
  static async Register(user: UserType): Promise<Omit<UserType, "password">> {
    try {
      const { error } = userValidation.parse(user);
      
      if (error) {
        throw new Error(error.details[0].message);
      }
  
      const isEmailRegistered = await User.getUserByEmail(user.email);
      if (isEmailRegistered) {
        throw new Error("Email sudah terdaftar");
      }
  
      const hashedPassword = await bcrypt.hash(user.password, 10);
  
      const isAdminEmail = ["admin1@gmail.com", "admin2@gmail.com"].includes(user.email);
      const role = isAdminEmail ? "admin" : "user";
  
      const createdUser = await User.createUser(
        user.username,
        user.email,
        hashedPassword,
        role
      );
  
      return {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        role: createdUser.role,
      };
    } catch (error: any) {
      throw new Error(`Error saat membuat pengguna: ${error.message}`);
    }
  }
  

  static async Login(email: string, password: string) {
    try {
      const user = await User.getUserByEmail(email);

      if (!user) {
        throw new Error("Pengguna tidak ditemukan");
      }

      if (!user.password) {
        throw new Error("Kata sandi tidak ditemukan");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Kata sandi tidak cocok");
      }

      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET environment variable not set");
      }

      const token = jwt.sign(payload, secret);

      return {
        user,
        token,
      };
    } catch (error: any) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
  
  static async Logout(res: Response): Promise<void> {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Berhasil keluar" });
    } catch (error: any) {
      throw new Error(`Error saat keluar: ${error.message}`);
    }
  }
}
