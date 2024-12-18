import { jwtVerify } from "jose";
const SECRET_KEY = process.env.JWT_SECRET || null;

export default async function authMiddleware(
  request: Request
): Promise<string | null> {
  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token || token == 'null' || token == null) return null;

  const verified:any = await jwtVerify(
    token,
    new TextEncoder().encode(SECRET_KEY ?? undefined)
  );
  return verified?.payload?.id;
}
