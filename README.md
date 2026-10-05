# Next.js CRUD — ระบบจัดการนักศึกษา

โปรเจกต์ตัวอย่างสำหรับเรียนรู้ **Next.js (App Router) + Prisma + SQLite** ประกอบด้วย

- **Student CRUD** — เพิ่ม / ดู / แก้ไข / ลบ นักศึกษา พร้อมตรวจสอบข้อมูลด้วย **Zod**
- **Blogs** — ตัวอย่าง `loading.tsx`, `Suspense`, Skeleton, `not-found`, `error`

---

## สิ่งที่ต้องมีก่อน

| โปรแกรม | เวอร์ชัน |
|---|---|
| [Node.js](https://nodejs.org) | **22 LTS ขึ้นไป** (ขั้นต่ำ 20.19) |
| npm | มากับ Node.js |

ตรวจสอบด้วย `node -v` และ `npm -v`

ไม่ต้องติดตั้ง Visual Studio หรือ Python — โปรเจกต์ใช้ฐานข้อมูลผ่าน `libsql` ซึ่งมีไฟล์สำเร็จรูปให้แล้ว
ต้องต่ออินเทอร์เน็ตตอนรัน (ฟอนต์จาก Google Fonts และหน้า `/blogs` ดึงข้อมูลจากภายนอก)

---

## วิธีติดตั้ง

```bash
cd crud
npm install
npx prisma generate
```

ไฟล์ `.env` และฐานข้อมูล `dev.db` มาให้พร้อมใช้แล้ว ไม่ต้องตั้งค่าเพิ่ม

## วิธีรัน

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ **http://localhost:3000/students** (หยุดเซิร์ฟเวอร์ด้วย `Ctrl + C`)
ถ้าพอร์ต 3000 ถูกใช้อยู่ Next.js จะเลือกพอร์ตอื่นให้เอง ดูจากข้อความใน Terminal

---

## การใช้งาน

| หน้า | ที่อยู่ |
|---|---|
| รายชื่อนักศึกษา | `/students` |
| เพิ่มนักศึกษา | `/students/create` |
| แก้ไขนักศึกษา | `/students/edit/1` |
| บล็อก (Loading / Skeleton) | `/blogs` |
| รายละเอียดบทความ | `/blogs/1` |
| ทดสอบหน้า 404 ของบล็อก | `/blogs/999` |
| หน้าทดสอบ Skeleton | `/skeleton` |

เปิด `/students` แล้วกด **เพิ่มนักศึกษา** กรอกฟอร์ม ระบบจะตรวจข้อมูลก่อนบันทึก
(รหัสนักศึกษาห้ามซ้ำ, ชั้นปี 1–8, รูปแบบอีเมลต้องถูกต้อง) ในหน้ารายชื่อมีปุ่ม **แก้ไข** และ **ลบ**

## คำสั่งที่ใช้บ่อย

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | รันโหมดพัฒนา |
| `npm run build` | build สำหรับ production |
| `npm start` | รันที่ build แล้ว (ต้อง `npm run build` ก่อน) |
| `npm run lint` | ตรวจโค้ดด้วย ESLint |
| `npx prisma studio` | เปิดดูข้อมูลในฐานข้อมูลผ่านเบราว์เซอร์ |
| `npx prisma migrate reset` | ล้างฐานข้อมูลทั้งหมดและสร้างใหม่ |

## โครงสร้างโปรเจกต์

```
crud/
├── app/
│   ├── students/       CRUD นักศึกษา (+ validation.ts ของ Zod)
│   ├── blogs/          ตัวอย่าง loading / not-found / error
│   ├── skeleton/       ตัวอย่าง Skeleton
│   ├── ui/             component ที่ใช้ร่วมกัน
│   └── lib/prisma.ts   Prisma Client
├── prisma/             schema.prisma และ migrations
├── dev.db              ฐานข้อมูล SQLite
└── .env                ค่าตั้งค่า
```

## แก้ปัญหาที่พบบ่อย

**`npm install` ขึ้น error เรื่อง `node-gyp` / Visual Studio**
ใช้ Node.js 22 LTS ขึ้นไป แล้วลบโฟลเดอร์ `node_modules` กับ `package-lock.json` ที่ค้างจากการติดตั้งก่อนหน้า จากนั้น `npm install` ใหม่

**`EPERM: operation not permitted` ตอนติดตั้งบน Windows**
มีโปรแกรมล็อกไฟล์อยู่ (VS Code, แอนตี้ไวรัส) ปิดโปรแกรมที่เปิดโฟลเดอร์นี้ ลบ `node_modules` แล้วติดตั้งใหม่ หรือรีสตาร์ทเครื่องก่อน

**ขึ้น error `Cannot find module '@/app/generated/prisma/client'`**
ยังไม่ได้สร้าง Prisma Client — รัน `npx prisma generate`

**หน้า `/blogs` โหลดช้า 3 วินาที**
ตั้งใจหน่วงไว้เพื่อให้เห็น Skeleton (ลบบรรทัด `setTimeout` ใน `app/ui/blogs.tsx` ได้) และต้องต่ออินเทอร์เน็ต

## ข้อควรระวัง

- หน้า `/students` ไม่มีระบบ Login — ใครเข้าถึงเว็บได้ก็เพิ่ม แก้ไข ลบข้อมูลได้
- ฐานข้อมูลเป็นไฟล์ SQLite (`dev.db`) เหมาะกับการทดลองในเครื่อง หากนำขึ้นโฮสต์ที่ไม่มีดิสก์ถาวร (เช่น Vercel) ข้อมูลจะไม่คงอยู่

## เทคโนโลยีที่ใช้

Next.js 16 · React 19 · Prisma 7 · SQLite (libsql) · Zod · Tailwind CSS 4 · TypeScript
