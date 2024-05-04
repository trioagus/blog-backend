import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  static async Register(req: Request, res: Response) {
    try {
      const user = await AuthService.Register(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.Login(email, password);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }


  static async Logout(req: Request, res: Response): Promise<void> {
    try {
      await AuthService.Logout(res);
    } catch (error: any) {
      res.status(500).json({ message: `Error saat keluar: ${error.message}` });
    }
  }
}