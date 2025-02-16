"use server";
import { Groups, User } from "@prisma/client";
import prisma from "../prisma";

export const createGroupAdminIfNotExists = async (userId: string | null) => {
  if (userId === null) return;
  const groupExists = await groupAdminExists();
  if (groupExists) return;
  const adminGroup = await createGroupAdmin();
  await addUserToAdminGroup({ group: adminGroup, userId: userId });
};

const groupAdminExists = async (): Promise<boolean> => {
  const adminGroup = await prisma.group.findFirst({
    where: {
      isAdmin: true,
    },
  });
  return adminGroup !== null;
};

const createGroupAdmin = async (): Promise<Groups> => {
  const adminGroup = await prisma.group.create({
    data: {
      title: "Admin",
      isAdmin: true,
    },
  });
  return adminGroup;
};

const addUserToAdminGroup = async (params: {
  group: Groups;
  userId: string;
}) => {
  const { group, userId } = params;
  const adminGroup = await prisma.group.update({
    where: {
      id: group.id,
    },
    data: {
      Users: {
        create: [
          {
            user: {
              connect: {
                id: userId,
              },
            },
          },
        ],
      },
    },
  });
};
