"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Props = {};

type formInputs = {
  name: string;
  email: string;
  message: string;
};

export default function FormContainer({}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    setIsLoading(true);
    await fetch("/message", {
      method: "POST",
      body: JSON.stringify(data),
    });
    router.refresh();
    setIsLoading(false);
  };
  return (
    <form
      className="flex flex-col gap-4 w-1/2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="Text" {...register("name")} id="name" placeholder="Name" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          {...register("email")}
          id="email"
          placeholder="Email"
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Your message</Label>
        <Textarea
          {...register("message")}
          placeholder="Type your message here."
          id="message"
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
