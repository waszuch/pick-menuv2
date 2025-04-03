"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import AddMenuItemForm from "./AddMenuItemForm"

export default function AddMenuToggle() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full flex justify-end mt-2 pr-4">
      {!open ? (
        <Button onClick={() => setOpen(true)}>➕ Dodaj danie</Button>
      ) : (
        <div className="relative bg-muted/30 p-6 rounded-xl shadow-lg z-10 max-w-md">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-white"
          >
            <X />
          </button>
          <h2 className="text-lg font-semibold mb-4">Nowe danie</h2>
          <AddMenuItemForm />
        </div>
      )}
    </div>
  )
}
