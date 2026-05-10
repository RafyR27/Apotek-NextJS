import { ISession } from "./user";

interface PropType {
  children: ReactNode;
  sessionData: ISession | null;
}

export type { PropType };
