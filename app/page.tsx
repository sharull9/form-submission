import FormContainer from "@/components/FormContainer";
import { MessageList, columns } from "@/components/messageTable/columns";
import { DataTable } from "@/components/messageTable/MessageList";

async function getData(): Promise<MessageList[]> {
  const res = await fetch("http://localhost:3000/message", {
    method: "GET",
    cache: "no-cache",
  });
  const data = await res.json();
  return data.res;
}
export async function deleteMessage(id: string) {
  const res = await fetch(`http://localhost:3000/message/?id=${id}`, {
    method: "DELETE",
  });
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <FormContainer />
      <DataTable columns={columns} data={data} />
    </main>
  );
}
