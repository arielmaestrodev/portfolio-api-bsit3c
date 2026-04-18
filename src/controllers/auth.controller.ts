import { Request, Response } from "express";
import { SignupService, VerifyEmailService } from "@/services/auth";


export class AuthContoller {
  // Signup
  public signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body ?? {};
    const result = await SignupService({ name, email, password });
    return res.status(result.code).json(result);
  }

  // Verify Email
  public verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.query;
    const result = await VerifyEmailService(token as string);
    return res.status(result.code).json(result);
  }
}