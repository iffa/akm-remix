export interface Voucher {
  code: string;
  priceWithVoucher: number;
  discount: {
    type: string;
    value: number;
  };
}
