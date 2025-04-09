'use client';

import { format, addDays, isSameDay } from "date-fns";
import { pl } from "date-fns/locale";
import { deleteMenuItem } from "@/actions/menu";
import { useRouter } from "next/navigation";

type MenuItem = {
  id: string;
  title: string;
  ingredients: string;
  type: 'SOUP' | 'MAIN_DISH';
  availableOn: Date;
};

type Props = {
  items: MenuItem[];
  weekStart: Date;
  user?: { id: string; email?: string } | null;
};

export default function WeekMenu({ items, weekStart, user }: Props) {
  const router = useRouter();
  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 p-4 w-full">
      {days.map(day => (
        <div
          key={day.toISOString()}
          className="border rounded-xl bg-muted/20 shadow-lg flex flex-col overflow-hidden h-full"
        >
          <div className="bg-primary text-primary-foreground px-4 py-2 font-semibold text-center">
            <div className="text-sm capitalize">
              {format(day, 'EEEE', { locale: pl })}
            </div>
            <div className="text-lg font-bold">
              {format(day, 'dd MMMM', { locale: pl })}
            </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-3">
            {items.filter(item => isSameDay(item.availableOn, day)).length > 0 ? (
              items.filter(item => isSameDay(item.availableOn, day)).map(item => (
                <div key={item.id} className="p-3 rounded-lg bg-background shadow-sm flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-base">
                      {item.type === 'SOUP' ? '🍲 Zupa' : '🍽️ Danie główne'}: {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.ingredients}</p>
                  </div>
                  {user && (
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 ml-2">
                      Usuń
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic text-center">
                Brak dań na ten dzień.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
