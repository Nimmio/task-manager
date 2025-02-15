import { authClient } from "./auth-client";

interface signInParams {
  email: string;
  password: string;
}

interface signInReturn {
  success: boolean;
  error: {
    code?: string;
    message?: string;
    status: number;
    statusText: string;
  } | null;
}

const signIn = async (params: signInParams): Promise<signInReturn> => {
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

export default signIn;
