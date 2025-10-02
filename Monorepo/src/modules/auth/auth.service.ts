import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IUser, IUserDocument, UserPayload, UserRole } from './auth.types';
import UserModel from './user.model';
import config from '../../config';
import { RolePermissionsMap } from '../../config/role-permissions.map';
import logger from '../../shared/utils/logger';
import { StringValue } from "ms";
class AuthService {
  public async registerUser(userData: Omit<IUser, 'permissions'>): Promise<IUserDocument> {
    const { username, password, role, department } = userData;
    logger.info({ username, role }, 'Attempting to register a new user');

    if (!Object.keys(RolePermissionsMap).includes(role)) {
      logger.warn({ username, role }, 'Registration failed: Invalid user role specified');
      throw new Error('Invalid user role specified');
    }
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      logger.warn({ username }, 'Registration failed: User with this username already exists');
      throw new Error('User with this username already exists');
    }
    const user = new UserModel({ username, password, role, department });
    await user.save();

    logger.info({ userId: (user._id as any).toHexString(), username }, 'User registered successfully');
    return user;
  }

  public async registerStudent(userData: Pick<IUser, 'username' | 'password'>): Promise<IUserDocument> {
    const { username, password } = userData;
    logger.info({ username }, 'Attempting to register a new student');

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      logger.warn({ username }, 'Student registration failed: User with this username already exists');
      throw new Error('User with this username already exists');
    }
    const user = new UserModel({ username, password, role: 'Student' });
    await user.save();

    logger.info({ userId: (user._id as any).toHexString(), username }, 'Student registered successfully');
    return user;
  }

  public async login(credentials: Pick<IUser, 'username' | 'password'>): Promise<{ accessToken: string; refreshToken: string; user: UserPayload }> {
    const { username, password } = credentials;
    logger.info({ username }, 'Login attempt started');

    const user = await UserModel.findOne({ username }).select('+password');
    if (!user || !password) {
      logger.warn({ username }, 'Login failed: User not found');
      throw new Error('Invalid credentials');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn({ username }, 'Login failed: Invalid credentials (password mismatch)');
      throw new Error('Invalid credentials');
    }
    const userPayload: UserPayload = {
      _id: (user._id as any).toString(),
      username: user.username,
      role: user.role as UserRole,
      department: user.department,
      permissions: user.permissions,
    };
    const accessToken = this.generateAccessToken(userPayload);
    const refreshToken = this.generateRefreshToken(userPayload);

    logger.info({ userId: (user._id as any).toHexString(), username }, 'User logged in successfully');
    return { accessToken, refreshToken, user: userPayload };
  }

  public generateAccessToken(payload: UserPayload): string {
    const secret: Secret = config.jwt.accessTokenSecret || "";
    if (!secret) {
      logger.error("CRITICAL: Access token secret is not configured!");
      throw new Error("Access token secret is not configured!");
    }

    const tokenPayload = {
      _id: payload._id,
      username: payload.username,
      role: payload.role,
      department: payload.department,
      permissions: payload.permissions,
    };

    const options: SignOptions = {
      expiresIn: config.jwt.accessTokenExpiresIn as StringValue,
    };

    return jwt.sign(tokenPayload, secret, options);
  }

  public generateRefreshToken(payload: UserPayload): string {
    const secret: Secret = config.jwt.refreshTokenSecret || "";
    if (!secret) {
      logger.error("CRITICAL: Refresh token secret is not configured!");
      throw new Error("Refresh token secret is not configured!");
    }

    const tokenPayload = {
      _id: payload._id,
      username: payload.username,
      role: payload.role,
      department: payload.department,
      permissions: payload.permissions,
    };

    const options: SignOptions = {
      expiresIn: config.jwt.refreshTokenExpiresIn as StringValue,
    };

    return jwt.sign(tokenPayload, secret, options);
  }


  public verifyRefreshToken(token: string): UserPayload {
    try {
      return jwt.verify(token, config.jwt.refreshTokenSecret!) as UserPayload;
    } catch (error) {
      logger.warn({ error }, 'Refresh token verification failed');
      throw new Error('Invalid or expired refresh token');
    }
  }
}

export default new AuthService();

