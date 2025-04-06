-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('SOUP', 'MAIN_DISH');

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "type" "MealType" NOT NULL DEFAULT 'MAIN_DISH';
