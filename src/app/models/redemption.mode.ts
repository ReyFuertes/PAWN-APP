import { Pawn } from "./pawn.model";
import { Account } from "./account.model";

export interface Redemption {
  id?: number;
  redemptionDate?: string;
  redemptionPawnTicket?: string;
  redemptionAmount?: string;
  redemptionTotalAmount?: string;
  interest?: number;
  difference?: number;
  remarks?: string;
  created: string;
  modified?: string;
  pawnId: number;
  pawn?: Pawn,
  account?: Account
}

