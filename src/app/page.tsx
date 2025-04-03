import { getUser } from "@/auth/server"
import { prisma } from "@/db/prisma"
import AddMenuItemForm from "@/components/AddMenuItemForm"
import CarouselSection from "@/components/CarouselSection"
import AddMenuToggle from "@/components/AddMenuToggle"

export default async function HomePage() {
  const user = await getUser()
  const items = await prisma.menuItem.findMany({
    orderBy: { availableOn: "asc" },
  })

  return (
    <main className="relative p-4 max-w-4xl mx-auto space-y-6">
      {user && (
        <AddMenuToggle />
      )}

      <h1 className="text-3xl font-bold text-center">Menu dnia</h1>
      <CarouselSection items={items} />
    </main>
  )
}
