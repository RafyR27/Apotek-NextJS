import environment from "@/config/environment";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "@/lib/auth";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: environment.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});
