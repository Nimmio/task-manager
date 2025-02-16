-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_groupsId_fkey";

-- CreateTable
CREATE TABLE "_GroupsToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupsToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GroupsToUser_B_index" ON "_GroupsToUser"("B");

-- AddForeignKey
ALTER TABLE "_GroupsToUser" ADD CONSTRAINT "_GroupsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupsToUser" ADD CONSTRAINT "_GroupsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
