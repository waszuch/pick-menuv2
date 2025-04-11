"use client"

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"    
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";
import { toast } from "sonner"

function LogOutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleLogOut = async () => {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const result = await logOutAction();
       
        
        if (result.errorMessage){
            toast.error("Error", {
                description: typeof result.errorMessage === 'string' ? result.errorMessage : 'An error occurred during logout'
            })
        } else {
            toast.success("Log Out", {
                description: "You have been logged out successfully"
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
