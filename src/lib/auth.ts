import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },

    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },

            async authorize(credentials) {
                console.log("CREDENTIALS RECEIVED:", credentials);

                if (!credentials?.email || !credentials?.password) {
                    console.log("❌ Missing credentials");
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                console.log("USER FOUND:", user);

                if (!user) {
                    console.log("❌ User not found");
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                console.log("PASSWORD VALID:", isValid);

                if (!isValid) {
                    console.log("❌ Invalid password");
                    return null;
                }

                console.log("✅ AUTHORIZED");

                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
            token.id = user.id;
            token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
            session.user.id = token.id as string;
            session.user.role = token.role as "ADMIN" | "CLIENT";
            }
            return session;
        },
    },

});