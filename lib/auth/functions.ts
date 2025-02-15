import { authClient } from "./auth-client";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { createGroupAdminIfNotExists } from "../group/admin";

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

export const signIn = async (params: signInParams): Promise<authReturns> => {
  const { email, password } = params;

  const { error } = await authClient.signIn.email({
    email,
    password,
  });

  return {
    success: error === null,
    error: error,
  };
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
