import { addToDB, prisma } from "@/services/add-to-database";
import { sendMail } from "@/services/send-mail";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

export async function POST(request: Request) {
  const res = await request.json();
  sendMail(res.name, res.email, res.message);
  addToDB(res.name, res.email, res.message);
  return NextResponse.json({ res });
}
