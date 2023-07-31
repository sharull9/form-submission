import { MessageList } from "@/components/messageTable/columns";

export async function addToDatabase(data: MessageList) {
  await fetch("/message", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
