import environment from "@/config/environment";
import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: environment.BETTER_AUTH_URL,
});
