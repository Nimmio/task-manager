import { redirect } from "next/navigation";
import { authClient } from "./auth-client";

const signUp = async (params) => {
  const { email, password } = params;

  const { data, error } = await authClient.signUp.email(
    {
      email,
      password,
      name: email,
      callbackURL: "/",
    },
    {
      onSuccess: (ctx) => {
        redirect("/");
      },
    }
  );
};

export default signUp;
