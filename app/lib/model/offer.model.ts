import { Currency } from "../enum/currency.enum";
import { Edition } from "./edition.model";
import { Region } from "./region.model";
import { Store } from "./store.model";
import { Voucher } from "./voucher.model";

export interface Offer {
  price: number;
  currency: Currency;
  stockStatus: string; // in_stock
  modificationDateime: string;
  available: boolean;
  store: Store;
  edition: Edition;
  region: Region;
  url: string;
  bestVoucher?: Voucher;
}
