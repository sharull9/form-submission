import { addToDB, prisma } from "@/services/add-to-database";
import { sendMail } from "@/services/send-mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  sendMail(res.name, res.email, res.message);
  addToDB(res.name, res.email, res.message);
  return NextResponse.json({ res });
}

export async function GET(request: Request) {
  // const apires = await request.json();
  console.log(request);
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
  return NextResponse.json({ res });
}
