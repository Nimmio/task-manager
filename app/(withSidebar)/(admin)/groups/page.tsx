import { currentUserisAdmin } from "@/lib/auth/functions";
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import GroupTable from "@/components/GroupTable/group-table";

const User = async () => {
  const isAdmin = await currentUserisAdmin(headers);
  if (!isAdmin) redirect("/");
  const groups = await prisma.group.findMany({ include: { Users: true } });

  return (
    <main>
      <GroupTable groups={groups} />
    </main>
  );
};

export default User;
