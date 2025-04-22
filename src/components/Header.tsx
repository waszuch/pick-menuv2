import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/auth/server";
import WeekPicker from "@/components/WeekPicker";

async function Header() {
  const user = await getUser();

  return (
    <header
      className="bg-popover flex items-center justify-between px-3 sm:px-8 py-2 sm:py-4 w-full"
      style={{ boxShadow: shadow }}
    >
      <Link className="flex items-center gap-2" href="/">
        <Image
          src="/menu.png"
          height={50}
          width={50}
          alt="logo"
          className="rounded-full"
          priority
        />
        <h1 className="text-xl sm:text-2xl font-semibold">
          Menu
        </h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <WeekPicker />

        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button asChild className="hidden sm:flex">
              <Link href="/sign-up">
                Zarejestruj się
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Zaloguj się</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;