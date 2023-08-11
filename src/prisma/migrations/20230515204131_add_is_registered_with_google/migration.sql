/*
  Warnings:

  - Added the required column `is_registered_with_google` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_registered_with_google" BOOLEAN NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
