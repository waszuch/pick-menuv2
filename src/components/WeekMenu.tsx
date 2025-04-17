"use client";

import { format, addDays, isSameDay } from "date-fns";
import { pl } from "date-fns/locale";
import { deleteMenuItem } from "@/actions/menu";
import { useRouter } from "next/navigation";
import AddMenuItemForm from "./AddMenuItemForm";

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
  };

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {days.map((day) => (
        <div
          key={day.toISOString()}
          className="flex-grow basis-full sm:basis-[calc(50%-1rem)] md:basis-[calc(33.333%-1rem)] lg:basis-[calc(25%-1rem)] xl:basis-[calc(20%-1rem)] 2xl:basis-[calc(14.285%-1rem)] border rounded-xl bg-muted/20 shadow-lg flex flex-col overflow-hidden h-[450px] transition-all hover:shadow-xl"
        >
          <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold text-center">
            <div className="text-sm capitalize">
              {format(day, 'EEEE', { locale: pl })}
            </div>
            <div className="text-lg font-bold">
              {format(day, 'dd MMMM', { locale: pl })}
            </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {items.filter(item => isSameDay(item.availableOn, day)).length > 0 ? (
              items
                .filter(item => isSameDay(item.availableOn, day))
                .map(item => (
                  <div key={item.id} className="p-4 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="font-semibold text-base">
                        {item.type === 'SOUP' ? '🍲' : '🍽️'}: {item.title}
                      </h3>
                      {item.ingredients && (
                        <p className="text-sm text-muted-foreground mt-2">{item.ingredients}</p>
                      )}
                    </div>
                    {user && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive/80 mt-3 text-sm font-medium transition-colors"
                      >
                        Usuń
                      </button>
                    )}
                  </div>
                ))
            ) : (
              <div className="flex items-center justify-center h-32">
                <p className="text-sm text-muted-foreground italic text-center">
                  Brak dań na ten dzień.
                </p>
              </div>
            )}
            {user && <div className="mt-4"><AddMenuItemForm defaultDate={day} /></div>}
          </div>
        </div>
      ))}
    </div>
  );
}
