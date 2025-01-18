import argon2 from "argon2";

export async function generateBearerToken(): Promise<{ rawToken: string; hashedToken: string }> {
  const rawToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const hashedToken = await argon2.hash(rawToken);
  return { rawToken, hashedToken };
}
