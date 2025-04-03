"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

type Props = {
  items: {
    id: string
    title: string
    ingredients: string
    availableOn: Date
  }[]
}

export default function CarouselSection({ items }: Props) {
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <div className="p-2">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.ingredients}</p>
                  <p className="mt-2 text-xs">
                    Dostępne: {format(new Date(item.availableOn), "PPP")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
