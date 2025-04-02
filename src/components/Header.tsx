import Link from "next/link";
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import  DarkModeToggle  from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";

function Header() {
  const user = null;
  return (
    <header className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8"
    style={{
      boxShadow: shadow
    }} 
    >
      <Link href="/">
      <Image 
      src="/menu.png" 
      alt="Menu Logo"
      width={60}
      height={60} 
      priority/>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton/>
        ): (
        <>
            <Button asChild className="hidden sm:block">
        <Link href="/sign-up">Sign Up</Link>
      </Button>
        <Button asChild variant="outline">
        <Link href="/login">Login</Link>
      </Button>
        </>)}
        <DarkModeToggle/>
      </div>
        
    </header>
  )
}

export default Header
