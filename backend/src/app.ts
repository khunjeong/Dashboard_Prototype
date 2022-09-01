import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import api from "./api";

class App {
  private _express: Express;

  constructor() {
    this._express = express();
    this._express.use(cors());
    this._express.use(morgan("dev"));
    this._express.use("/api", api);
    this._express.use("/", express.static("./../frontend/dist"));
    this._express.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "./../../frontend/dist/index.html"));
    });
  }

  get express(): Express {
    return this._express;
  }

  public listening(port: string | number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._express.listen(port, () => {
        resolve(port);
      });
    });
  }
}

const app = new App();

export default app;
