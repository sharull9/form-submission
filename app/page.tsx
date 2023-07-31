import FormContainer from "@/components/FormContainer";
import { MessageList, columns } from "@/components/messageTable/columns";
import { DataTable } from "@/components/messageTable/MessageList";
import axios from "axios";

async function getData(req: Request) {
  const { data } = await axios.get(req.protocol + "://” + req.url + ”/message");
  return data.res;
}

export default async function Home() {
  const data: MessageList[] = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <FormContainer />
      <DataTable columns={columns} data={data} />
    </main>
  );
}
