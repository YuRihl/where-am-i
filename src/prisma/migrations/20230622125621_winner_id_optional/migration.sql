-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_winner_id_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "winner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
