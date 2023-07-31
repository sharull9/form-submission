import { DataTable } from "@/components/messageTable/MessageList";
import { columns, MessageList } from "@/components/messageTable/columns";
import { Button } from "@/components/ui/button";
import { prisma } from "@/services/add-to-database";

export default async function Home() {
  const base = getAbsoluteUrl();
  async function getData() {
    // const data: MessageList[] = await prisma.message.findMany();
    const res = await fetch("https://form-submission-psi.vercel.app/message", {
      cache: "no-cache",
      next: {
        tags: ["message"],
      },
    });
    const data = await res.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data.res;
  }
  const data = await getData();
  return (
    <main className="flex flex-col gap-4 w-1/2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Data list</h2>
        <Button>Refresh Data</Button>
      </div>
      {data && (
        <>
          <DataTable columns={columns} data={data} />
        </>
      )}
    </main>
  );
}

export function getProtocol() {
  const isProd = process.env.VERCEL_ENV === "production";
  if (isProd) return "https://";
  return "http://";
}

export function getAbsoluteUrl() {
  //get absolute url in server.
  const protocol = getProtocol();
  if (process.env.VERCEL_URL) {
    console.log(`${protocol}${process.env.VERCEL_URL}`);
    return `${protocol}${process.env.VERCEL_URL}`;
  }
}
