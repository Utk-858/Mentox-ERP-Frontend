import { Request, Response } from 'express';
import AuthService from './auth.service';
import asyncHandler from '../../shared/utils/asyncHandler';

class AuthController {
  public register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password, role, department } = req.body;
    const user = await AuthService.registerUser({ username, password, role, department });
    res.status(201).json({ message: 'User created successfully', user });
  });

  public registerStudent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const user = await AuthService.registerStudent({ username, password });
    res.status(201).json({ message: 'Student created successfully', user });
  });

  public login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const { accessToken, refreshToken, user } = await AuthService.login({ username, password });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh-token',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, user });
  });

  public refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies?.refreshToken;
    if (!token) {
      res.status(401).json({ message: 'No refresh token provided' });
      return;
    }
    const userPayload = AuthService.verifyRefreshToken(token);
    const { iat, exp, ...payloadToSign } = userPayload;
    const newAccessToken = AuthService.generateAccessToken(payloadToSign);
    res.status(200).json({ accessToken: newAccessToken });
  });

  public logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh-token',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  });
}

export default new AuthController();

