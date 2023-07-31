"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type formInputs = {
  name: string;
  email: string;
  message: string;
};

export default function FormContainer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    setIsLoading(true);
    const res = await fetch("/message", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const rep = await res.json();
    console.log(rep);
    setIsLoading(false);
    router.refresh();
  };
  return (
    <form
      className="flex flex-col gap-6 w-1/2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-slate-800 text-xl">Submit a form</h1>
      <div className="grid w-full items-center gap-1.5">
        <Label className="mb-2" htmlFor="name">
          Name
        </Label>
        <Input type="Text" {...register("name")} id="name" placeholder="Name" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className="mb-2" htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          {...register("email")}
          id="email"
          placeholder="Email"
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label className="mb-2" htmlFor="message">
          Your message
        </Label>
        <Textarea
          {...register("message")}
          placeholder="Type your message here."
          id="message"
          className="h-44"
        />
      </div>
      <Button>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 border-white animate-spin" />
        ) : (
          "Send messsage"
        )}
      </Button>
    </form>
  );
}
