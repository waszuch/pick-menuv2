"use client";


import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { loginAction } from "@/actions/users";
import { toast } from "sonner"


type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

    let errorMessage;
    let title;
    let description;
     if (isLoginForm) {
      errorMessage = (await loginAction(email, password)).errorMessage;
      title = "Logged in";
      description = "You have been logged in successfully";
     }

  

  if(!errorMessage){
    toast.success(title, {
      description,
    })
    router.push("/")
  }else{
    toast.error("Error")
  }
    });
  };
       
  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Wprowadź email"
            type="email"
            required
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Hasło</Label>
          <Input
            id="password"
            name="password"
            placeholder="Wprowadź hasło"
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Zaloguj się"
          ) : (
            "Sign Up"
          )}
        </Button>
      </CardFooter>
    </form>
  );
}

export default AuthForm;