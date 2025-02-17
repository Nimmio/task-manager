import { currentUserisAdmin } from "@/lib/auth/functions";
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import UserTable from "@/components/user-table";

const User = async () => {
  const isAdmin = await currentUserisAdmin(headers);
  if (!isAdmin) redirect("/");

  const users = await prisma.user.findMany();
  return (
    <div>
      <UserTable users={users} />
    </div>
  );
};

export default User;
