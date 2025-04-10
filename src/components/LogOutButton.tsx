"use client"

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"    
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";


function LogOutButton() {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast(); 
    const router = useRouter();
    const handleLogOut = async () => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const result = await logOutAction();
       
        
        if (result.errorMessage){
            toast({
                title: "Error",
                description: typeof result.errorMessage === 'string' ? result.errorMessage : 'An error occurred during logout',
                variant: "destructive",
            })
        } else {
            toast({
                title: "Log Out",
                description: "You have been logged out successfully",
                variant: "success",
            })
            router.push("/")
        }

        
    setLoading(false)
    }
  return (
    <Button 
    variant="outline"
    onClick={handleLogOut}
    disabled={loading}
    className="w-24">{loading ? <Loader2 className="animate-spin"/> : "Wyloguj"}
    </Button>
  )
}

export default LogOutButton
