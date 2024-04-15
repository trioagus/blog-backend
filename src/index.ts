import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import Auth from "./routes/auth";
import User from "./routes/user";
import Category from "./routes/category";
import Article from "./routes/article";
import Comment from "./routes/comment";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/auth", Auth);
app.use("/user", User);
app.use("/category", Category);
app.use("/comment", Comment);
app.use("/article", Article);

const port = process.env.PORT || 3003;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads'), {
  maxAge: '365d'
}));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
