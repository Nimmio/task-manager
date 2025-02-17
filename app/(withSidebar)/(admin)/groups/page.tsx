import { currentUserisAdmin } from "@/lib/auth/functions";
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import GroupView from "@/components/group-view";

const User = async () => {
  const isAdmin = await currentUserisAdmin(headers);
  if (!isAdmin) redirect("/");
  const groups = await prisma.group.findMany({ include: { Users: true } });

  return (
    <main>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {groups.map((group) => (
          <GroupView key={group.id} group={group} />
        ))}
      </div>
    </main>
  );
};

export default User;
