import FormContainer from "@/components/FormContainer";
import { MessageList, columns } from "@/components/messageTable/columns";
import { DataTable } from "@/components/messageTable/MessageList";

async function getData() {
  const res = await fetch(
    "https://form-submission-b3mmlwcqx-sharull9.vercel.app/message",
    {
      cache: "no-cache",
    }
  );
  const data = await res.json();
  return data.res;
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
