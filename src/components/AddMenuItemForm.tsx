"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { createMenuItem } from "@/actions/menu"
import { toast } from "sonner"

// Importy z shadcn:
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

type Props = {
  defaultDate: Date;
}

export default function AddMenuItemForm({ defaultDate }: Props) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [title, setTitle] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [type, setType] = useState<"SOUP" | "MAIN_DISH">("MAIN_DISH")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !type) {
      toast.error("Błąd", {
        description: "Uzupełnij wymagane pola!"
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("ingredients", ingredients || "")
      formData.append("availableOn", defaultDate.toISOString())
      formData.append("type", type)

      await createMenuItem(formData)

      formRef.current?.reset()
      setTitle("")
      setIngredients("")
      setType("MAIN_DISH")

      router.refresh()
      toast.success("Sukces", {
        description: "Danie zostało dodane!"
      })
    } catch (err) {
      toast.error("Błąd", {
        description: "Wystąpił błąd przy dodawaniu dania."
      })
    }
  }

  return (
    <Dialog>
      {/* Przycisk wywołujący modal */}
      <DialogTrigger asChild>
        <Button className="w-full mt-4">Dodaj nowe danie</Button>
      </DialogTrigger>

      {/* Treść modala */}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nowe danie</DialogTitle>
          <DialogDescription>
            Wypełnij poniższe pola, aby dodać nowe danie do menu na dzień {format(defaultDate, "PPP", { locale: pl })}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tytuł dania"
          />
          <Input
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Składniki (oddzielone przecinkami)"
          />

          <div>
            <Label className="mb-2">Typ dania:</Label>
            <RadioGroup
              defaultValue="MAIN_DISH"
              value={type}
              onValueChange={(val: "SOUP" | "MAIN_DISH") => setType(val)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SOUP" id="soup" />
                <Label htmlFor="soup">Zupa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MAIN_DISH" id="main" />
                <Label htmlFor="main">Danie główne</Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button type="submit">Dodaj do menu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
