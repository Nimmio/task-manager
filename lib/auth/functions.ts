"use server";
import { authClient } from "./auth-client";
import { redirect } from "next/navigation";
import { createGroupAdminIfNotExists } from "../group/admin";
import { auth } from "./auth";
import { Group } from "@prisma/client";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import prisma from "../prisma";

interface signInParams {
  email: string;
  password: string;
}

interface signUpParams {
  email: string;
  password: string;
}

interface authReturns {
  success: boolean;
  error: {
    code?: string;
    message?: string;
    status: number;
    statusText: string;
  } | null;
}

export const signIn = async (params: signInParams) => {
  const { email, password } = params;

  await authClient.signIn.email({
    email,
    password,
  });
};

export const signOut = async (): Promise<authReturns> => {
  const { error } = await authClient.signOut({});

  return {
    success: error === null,
    error: error,
  };
};

export const signUp = async (params: signUpParams): Promise<authReturns> => {
  const { email, password } = params;
  const { data, error } = await authClient.signUp.email({
    email,
    password,
    name: email,
    callbackURL: "/",
  });

  createGroupAdminIfNotExists(data?.user.id || null);

  return {
    success: error === null,
    error: error,
  };
};

const currentUserId = async (
  headers: () => Promise<ReadonlyHeaders>
): Promise<string | null> => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session === null) return null;

  const { userId } = session.session;
  return userId;
};

const getGroupsForUserId = async (userId: string): Promise<Group[]> => {
  return await prisma.group.findMany({
    where: {
      Users: {
        some: {
          userId,
        },
      },
    },
  });
};

export const currentUserisAdmin = async (
  headers: () => Promise<ReadonlyHeaders>
): Promise<boolean> => {
  let returnValue = false;

  const userId = await currentUserId(headers);

  if (userId === null) return false;

  const groups = await getGroupsForUserId(userId);

  groups.every((group) => {
    if (group.isAdmin) {
      returnValue = true;
      return false;
    }
    return true;
  });

  return returnValue;
};
