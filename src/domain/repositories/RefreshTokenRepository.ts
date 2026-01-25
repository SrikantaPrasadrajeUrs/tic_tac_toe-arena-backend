import { ByCryptHasher } from "../../infrastructure/auth/BycryptHasher";
import { RefreshTokenHasher } from "../../infrastructure/auth/RefreshTokenHasher";
import { RefreshToken } from "../entities/RefreshToken";

export interface CreateRefreshToken {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface RefreshTokenRepository {
  create(data: {
    id: string,
    userId: string,
    token: string,
    expiresAt: Date
  }, hasher: RefreshTokenHasher): Promise<void>;
  findValid(id: string, token: string): Promise<RefreshToken | null>;
  revoke(token: string): Promise<void>;
}

