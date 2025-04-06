import { format, addDays, isSameDay } from "date-fns"
import { pl } from "date-fns/locale"

type MenuItem = {
  id: string
  title: string
  ingredients: string
  type: 'SOUP' | 'MAIN_DISH'
  availableOn: Date
  }

  type Props = {
    items: MenuItem[]
    weekStart: Date
    user?: { id: string; email: string } | null 
  }

export default function WeekMenu({ items, weekStart, user }: Props) {
  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {days.map(day => (
        <div key={day.toISOString()} className="border rounded-lg p-4 bg-muted/20">
          <h2 className="font-bold text-lg mb-2">{format(day, 'EEEE, dd MMMM', { locale: pl })}</h2>
          {items.filter(item => isSameDay(item.availableOn, day)).length > 0 ? (
            items.filter(item => isSameDay(item.availableOn, day)).map(item => (
              <div key={item.id} className="mb-2 p-2 rounded bg-background shadow-sm">
                <p className="font-semibold">{item.type === 'SOUP' ? 'Zupa' : 'Danie główne'}: {item.title}</p>
                <p className="text-sm text-muted-foreground">{item.ingredients}</p>
              </div>
            ))
          ) : <p className="text-sm text-muted-foreground">Brak dań na ten dzień.</p>}
        </div>
      ))}
    </div>
  )
}
