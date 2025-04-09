import { prisma } from "@/db/prisma"
import { getUser } from "@/auth/server"
import { startOfWeek, addDays, parseISO } from "date-fns"
import WeekMenu from "@/components/WeekMenu"
import AddMenuItemForm from "@/components/AddMenuItemForm"

export default async function HomePage({ searchParams }: { searchParams: { week?: string } }) {
  const user = await getUser();

  const selectedWeek = searchParams.week
    ? parseISO(searchParams.week)
    : new Date();

  selectedWeek.setHours(12, 0, 0, 0);

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });

  const items = await prisma.menuItem.findMany({
    where: {
      availableOn: {
        gte: weekStart,
        lte: addDays(weekStart, 6),
      },
    },
    orderBy: { availableOn: "asc" },
  });

  return (
    <main className="max-w-full mx-auto p-4">
      <div className="relative p-4 max-w-full mx-auto space-y-6">
        {user && <AddMenuItemForm />}
        <WeekMenu items={items} weekStart={weekStart} user={user} />
      </div>
    </main>
  );
}