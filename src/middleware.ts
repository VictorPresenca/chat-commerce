import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (!isAdminRoute) {
        return NextResponse.next();
    }

    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
    });

    // Não logado ou não é admin
    if (!token || token.role !== "ADMIN") {
        return NextResponse.redirect(
            new URL("/login", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};