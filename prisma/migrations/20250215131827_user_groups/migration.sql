-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "groupsId" INTEGER;

-- CreateTable
CREATE TABLE "Groups" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
