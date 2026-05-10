import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import environment from "@/config/environment";

const client = new MongoClient(environment.DATABASE_URL);
await client.connect();
const db = client.db("users");

export const auth = betterAuth({
  baseURL: environment.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  user: {
    additionalFields: {
      gambar: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: environment.GOOGLE_CLIENT_ID as string,
      clientSecret: environment.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
