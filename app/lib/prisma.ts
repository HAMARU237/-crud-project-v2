import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/app/generated/prisma/client";

// ใช้ libsql แทน better-sqlite3 เพื่อไม่ต้องคอมไพล์ C++ (ใช้งานบน Windows ได้ทันที)
const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
