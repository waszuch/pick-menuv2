import { prisma } from "@/db/prisma"
import { getUser } from "@/auth/server"
import { startOfWeek, addDays, parseISO } from "date-fns"
import WeekMenu from "@/components/WeekMenu"
import AddMenuToggle from "@/components/AddMenuToggle"

export default async function HomePage({ searchParams }: { searchParams: { week?: string } }) {
  const user = await getUser()

  const selectedWeek = searchParams.week
    ? parseISO(searchParams.week)
    : new Date()

  selectedWeek.setHours(12, 0, 0, 0) // 🔧 Zabezpieczenie anty-UTC

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 })

  const items = await prisma.menuItem.findMany({
    where: {
      availableOn: {
        gte: weekStart,
        lte: addDays(weekStart, 6),
      },
    },
    orderBy: { availableOn: "asc" },
  })

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="relative p-4 max-w-4xl mx-auto space-y-6">
        {user && <AddMenuToggle />}
        <WeekMenu items={items} weekStart={weekStart} />
      </div>
    </main>
  )
}
