import { ISession } from "./user";

interface PropType {
  children: ReactNode;
}

interface IPropWithSession {
  children: ReactNode;
  sessionData: ISession | null;
}

interface IPropOnlySession {
  session: ISession | null;
}

export type { PropType, IPropWithSession, IPropOnlySession };
