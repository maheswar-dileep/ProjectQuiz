import { NextFunction, Response } from "express";
import { RequestDefention } from "./defeniton.js";

export default (req: RequestDefention, res: Response, next: NextFunction) => {
  // TODO
  // Check for steps complition
  // Check for user active state
  // Send curresponding notification
  // If nessosery send nessosery response
  next();
};
