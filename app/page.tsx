import { DataTable } from "@/components/messageTable/MessageList";
import { columns, MessageList } from "@/components/messageTable/columns";
import { Button } from "@/components/ui/button";
import { prisma } from "@/services/add-to-database";

export default async function Home() {
  async function getData() {
    // const data: MessageList[] = await prisma.message.findMany();
    const res = await fetch(
      "https://form-submission-git-master-sharull9.vercel.app/message",
      {
        cache: "no-cache",
      }
    );
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
