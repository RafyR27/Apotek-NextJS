import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import environment from "@/config/environment";
import { sendMailSecurity, sendMailVerif } from "./mailer";

const client = new MongoClient(environment.DATABASE_URL);
await client.connect();
const db = client.db("users");

export const auth = betterAuth({
  baseURL: environment.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const urlObj = new URL(url);
      urlObj.searchParams.set("callbackURL", `/auth/login?verified=true`);
      const finalUrl = urlObj.toString();

      await sendMailVerif({
        email: user.email,
        username: user.name,
        verifyUrl: finalUrl,
      });
    },
    sendOnSignUp: true,
    expiresIn: 3600,
    autoSignInAfterVerification: false,   
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        defaultValue: "user",
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    onExistingUserSignUp: async ({ user }) => {
      const attemptTime = new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
      });

      if (!user.emailVerified) {
        await auth.api.sendVerificationEmail({
          body: {
            email: user.email,
          },
        });
      } else {
        await sendMailSecurity({
          email: user.email,
          username: user.name,
          changePasswordUrl: `${environment.BETTER_AUTH_URL}/reset-password`,
          attemptTime,
        });
      }
    },
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: environment.GOOGLE_CLIENT_ID as string,
      clientSecret: environment.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
