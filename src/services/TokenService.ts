import prisma from "../config/prisma";
import argon2 from "argon2";

export class TokenService {
  async validateToken(receivedToken: string): Promise<boolean> {
    const tokens = await prisma.token.findMany();

    for (const token of tokens) {
      if (await argon2.verify(token.token, receivedToken.replace("Bearer ", ""))) {
        return true;
      }
    }

    return false;
  }
}
