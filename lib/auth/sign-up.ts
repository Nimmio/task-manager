import { authClient } from "./auth-client";

const signup = async (params) => {
  const { username, password } = params;

  const { data, error } = await authClient.signUp.email(
    {
      username,
      password,
      callbackURL: "/",
    },
    {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    }
  );
};

export default signup;
