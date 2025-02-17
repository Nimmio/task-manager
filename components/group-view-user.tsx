import prisma from "@/lib/prisma";
import React from "react";

const GroupViewUser = async (params: { userId: string }) => {
  const { userId } = params;
  const user = await prisma.user.findFirst({ where: { id: userId } });
  return <li> {user?.name}</li>;
};

export default GroupViewUser;
