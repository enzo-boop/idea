import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token && req.method != "GET") {
    return NextResponse.json({ error: "Accesso negato!" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/post"],
};
