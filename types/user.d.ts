interface IUser {
  fullName: string;
  email: string;
  password: string;
  noHP?: string;
  gambar?: string;
  role?: "admin" | "kasir" | "user";
}

interface IUserLogin {
  email: string,
  password: string,
}

interface IUserSession {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
}

interface ISession {
  session: {
    id: string;
    expiresAt: Date;
  };

  user: IUserSession;
}

export { IUser, ISession, IUserLogin };
