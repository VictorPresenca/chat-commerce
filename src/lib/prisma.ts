// @ts-ignore
import { PrismaClient as BaseClient } from "@prisma/client/edge";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type PrismaClientType = import("@prisma/client").PrismaClient;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientType | undefined;
};

const sql = neon(process.env.DATABASE_URL!) as NeonQueryFunction<any, any>;

// @ts-ignore
const adapter = new PrismaNeon(sql);

export const prisma =
    globalForPrisma.prisma ??
    new BaseClient({
        adapter,
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}