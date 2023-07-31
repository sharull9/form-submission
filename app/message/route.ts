import { addToDB, prisma } from "@/services/add-to-database";
import { sendMail } from "@/services/send-mail";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const res = await request.json();
  sendMail(res.name, res.email, res.message);
  addToDB(res.name, res.email, res.message);
  revalidateTag("message");
  return NextResponse.json({ res });
}

export async function GET(request: Request) {
  const res = await prisma.message.findMany();
  return NextResponse.json({ res });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const elementId = searchParams.get("id");
  //@ts-ignore
  const res = await prisma.message.delete({
    where: {
      id: `${elementId}`,
    },
  });
  revalidateTag("message");
  return NextResponse.json({ res });
}
