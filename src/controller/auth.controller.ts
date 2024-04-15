import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

type UserType = {
    id?: string;
    username: string;
    email: string;
    password: string;
    role?: string;
};

export class AuthController {
  static async Register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      const user: UserType = await AuthService.Register({
        id: "",
        username,
        email,
        password,
      });
      res.status(201).json({
        message: "User berhasil terdaftar",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  

  static async Login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const loginData = await AuthService.Login(email, password);
      res.status(200).json(loginData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async Logout(req: Request, res: Response) {
    try {
      await AuthService.Logout(res); 
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
    }
  }
}  