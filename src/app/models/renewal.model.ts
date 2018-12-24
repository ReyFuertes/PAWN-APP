import { Pawn } from "./pawn.model";
import { Account } from "./account.model";

export interface Renewal {
  id?: number;
  renewalDate?: string;
  renewalPawnTicket?: string;
  renewalAmount?: string;
  renewalTotalAmount?: string;
  interest?: number;
  difference?: number;
  remarks?: string;
  created: string;
  modified?: string;
  pawnId: number;
  pawn?: Pawn,
  account?: Account
}

