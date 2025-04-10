'use server'
 
 import { prisma } from "@/db/prisma"
 import { getUser } from "@/auth/server"
 
 export async function createMenuItem(formData: FormData) {
   const user = await getUser()
   if (!user) {
     throw new Error("Unauthorized")
   }
 
   const title = formData.get("title")?.toString()
   const ingredients = formData.get("ingredients")?.toString() || ""
   const availableOn = formData.get("availableOn")?.toString()
   const type = formData.get("type") as "SOUP" | "MAIN_DISH"
 
   if (!title || !availableOn || !type) {
     throw new Error("Brak wymaganych danych")
   }
 
   const item = await prisma.menuItem.create({
     data: {
       title,
       ingredients,
       availableOn: new Date(availableOn),
       type,
       userId: user.id,
     },
   })
 
   return item
 }
 
 export async function deleteMenuItem(itemId: string) {
   const user = await getUser();
   if (!user) {
     throw new Error("Unauthorized");
   }
 
   const item = await prisma.menuItem.findUnique({
     where: { 
       id: itemId,
       userId: user.id
     },
   });
 
   if (!item) {
     throw new Error("Item not found or you do not have permission to delete this item.");
   }
 
   await prisma.menuItem.delete({
     where: { id: itemId },
   });
 
   return { success: true };
 }