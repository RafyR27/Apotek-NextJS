import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import environment from "@/config/environment";
import { sendMail } from "./mailer";

const client = new MongoClient(environment.DATABASE_URL);
await client.connect();
const db = client.db("users");

export const auth = betterAuth({
  baseURL: environment.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),

  emailVerification: {
    sendVerificationEmail: async ({user, url}) => {
      await sendMail({
        email: user.email,
        username: user.name,
        verifyUrl: url,
      });
    },
    sendOnSignUp: true,
    expiresIn: 3600,
    autoSignInAfterVerification: true
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
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: environment.GOOGLE_CLIENT_ID as string,
      clientSecret: environment.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
