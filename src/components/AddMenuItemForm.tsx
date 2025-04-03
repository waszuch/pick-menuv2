"use client"

import { useRef } from "react"
import { createMenuItem } from "@/actions/menu"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AddMenuItemForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    try {
      await createMenuItem(formData)
      formRef.current?.reset()
      router.refresh()
    } catch (err) {
      alert("Błąd: " + (err as Error).message)
    }
  }

  return (
    <form action={handleSubmit} ref={formRef} className="space-y-4 max-w-md">
      <input name="title" type="text" placeholder="Tytuł" className="w-full border p-2" />
      <input name="ingredients" type="text" placeholder="Składniki" className="w-full border p-2" />
      <input name="availableOn" type="date" className="w-full border p-2" />
      <Button type="submit">Dodaj</Button>
    </form>
  )
}
