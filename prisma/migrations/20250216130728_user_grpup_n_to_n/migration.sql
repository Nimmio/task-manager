/*
  Warnings:

  - You are about to drop the column `groupsId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupsToUser" DROP CONSTRAINT "_GroupsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupsToUser" DROP CONSTRAINT "_GroupsToUser_B_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "groupsId";

-- DropTable
DROP TABLE "Groups";

-- DropTable
DROP TABLE "_GroupsToUser";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupOnUsers" (
    "userId" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupOnUsers_pkey" PRIMARY KEY ("userId","groupId")
);

-- AddForeignKey
ALTER TABLE "GroupOnUsers" ADD CONSTRAINT "GroupOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupOnUsers" ADD CONSTRAINT "GroupOnUsers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
