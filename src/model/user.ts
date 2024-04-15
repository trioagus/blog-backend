import { db } from "../config/database";
import { validateUserInput } from "../security/userValidation"; 
import { sanitizeInput } from "../security/sanitize";
import { v4 as uuidv4 } from "uuid";

export class User {
  static async createUserTable(): Promise<void> {
    try {
      await (await db).query(`
        CREATE TABLE IF NOT EXISTS user (
          id VARCHAR(36) PRIMARY KEY, 
          username VARCHAR(50), 
          email VARCHAR(50), 
          password VARCHAR(255),
          role ENUM('user', 'admin') NOT NULL DEFAULT 'user'
        )
      `);
      console.log("Table 'user' created or already exists.");
    } catch (error) {
      console.error("Error creating 'user' table:", error);
    }
  }

  static async createUser(
    username: string,
    email: string,
    password: string,
    role: string = "user"
  ): Promise<any> {
    validateUserInput(username, email, password);
    username = sanitizeInput(username);
    email = sanitizeInput(email);

    const id = uuidv4();
    try {
      const [rows] = await (await db).query(
        "INSERT INTO user (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [id, username, email, password, role]
      );
      return rows;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async getUserById(id: string): Promise<any> {
    try {
      const [rows] = await (await db).query("SELECT * FROM user WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  }

  static async getUsers(): Promise<any> {
    try {
      const [rows] = await (await db).query("SELECT * FROM user");
      return rows;
    } catch (error) {
      console.error("Error getting users:", error);
      throw error;
    }
  }

  static async getUserByEmail(email: string): Promise<any> {
    try {
      const [rows] = await (await db).query("SELECT * FROM user WHERE email = ? LIMIT 1", [
        email,
      ]);
  
      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0]; // Mengembalikan objek pengguna tunggal jika ditemukan
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting user by email:", error);
      throw error;
    }
  }
  

  static async isEmailRegistered(email: string): Promise<boolean> {
    try {
      const user = await (await db).query("SELECT * FROM user WHERE email = ?", [email]);
      return user.length > 0; // Mengembalikan true jika email sudah terdaftar, false jika tidak
    } catch (error) {
      console.error("Error checking email registration:", error);
      throw error;
    }
  }

  static async updateUser(
    id: string,
    username: string,
    email: string,
    password: string,
    role: string
  ): Promise<any> {
    validateUserInput(username, email, password); 
    username = sanitizeInput(username);
    email = sanitizeInput(email);

    try {
      const [rows] = await (await db).query(
        "UPDATE user SET username = ?, email = ?, role = ? WHERE id = ?",
        [username, email, role, id]
      );
      return rows;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async deleteUser(id: string): Promise<any> {
    try {
      const [rows] = await (await db).query("DELETE FROM user WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

User.createUserTable();
