"use client"

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";


type Props={
    type : "login" | "SignUp"
}

function AuthForm({type}: Props) {
  const isLoginForm = type === "login";

  const router = useRouter();
  const {toast} = useToast();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData:FormData) => {
    console.log("form submited")
  }
  return (
<form action={handleSubmit}>
  <CardContent className="grid w-full items-center gap-4">
    <div className="flex flex-col space-y-1.5">
    <Label htmlFor="email">Email</Label>
    <Input
    id="email"
    name="email"
    placeholder="enter your email"
    required
    disabled={isPending}/>
    </div>
    <div className="flex flex-col space-y-1.5">
    <Label htmlFor="email">Password</Label>
    <Input
    id="password"
    name="password"
    placeholder="enter your password"
    required
    disabled={isPending}/>
    </div>
  </CardContent>
  <CardFooter className="mt-4 flex flex-col gap-6">
    <Button className="w-full" >
      {isPending ? <Loader2 className="animate-spin"/> :isLoginForm ? "Login" : "SignUp" }
    </Button>
  </CardFooter>
</form>
  )
}

export default AuthForm
