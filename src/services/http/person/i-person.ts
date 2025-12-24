import type { IFamiliarity } from "../familiarity/i-familiarity";

export interface IPerson {
  id: number;
  name: string;
  familiarityId: number;
  userId: number;
  bornAt: Date;
  createdAt: Date;
  updatedAt: Date;
  familiarity?: IFamiliarity;
}
