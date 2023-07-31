import { DataTable } from "@/components/messageTable/MessageList";
import { columns, MessageList } from "@/components/messageTable/columns";
import { Button } from "@/components/ui/button";
import { prisma } from "@/services/add-to-database";

export default async function Home() {
  async function getData() {
    const data: MessageList[] = await prisma.message.findMany();
    return data;
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
