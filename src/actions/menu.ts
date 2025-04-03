'use server'

import { prisma } from "@/db/prisma"
import { getUser } from "@/auth/server"

export async function createMenuItem(
  formData: FormData
) {
  const user = await getUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title")?.toString() || ""
  const ingredients = formData.get("ingredients")?.toString() || ""
  const availableOn = formData.get("availableOn")?.toString() || ""

  if (!title || !ingredients || !availableOn) {
    throw new Error("Brak wymaganych danych")
  }

  const item = await prisma.menuItem.create({
    data: {
      title,
      ingredients,
      availableOn: new Date(availableOn),
      userId: user.id,
    },
  })

  return item
}
