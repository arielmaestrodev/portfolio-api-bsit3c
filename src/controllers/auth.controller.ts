import { Request, Response } from "express";
import { SignupService, VerifyEmailService, LoginCredentialsService } from "@/services/auth";
import { ENV } from "@/config/env";
import { TokenExpiry, toMilliseconds } from "@/lib/jwt";


export class AuthContoller {
  // Helper to set cookies
  private setAuthCookies(res: Response, tokens: { accessToken: string; refreshToken: string }) {
    const isProduction = ENV.NODE_ENV === "production";

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: toMilliseconds(TokenExpiry.ACCESS_TOKEN_EXPIRES),
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: toMilliseconds(TokenExpiry.REFRESH_TOKEN_EXPIRES),
    });
  }
  
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

  // Handle Login Account
  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};
    const result = await LoginCredentialsService(email, password);

    if (result.code === 200 && result.data?.tokens) {
      this.setAuthCookies(res, result.data.tokens);
    }

    return res.status(result.code).json(result);
  };
}