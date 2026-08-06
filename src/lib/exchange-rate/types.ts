export type Currency = {
  code: string;
  name: string;
};

export type ExchangeRateResponse = {
  baseCode: string;
  targetCode: string;
  rate: number;
  convertedAmount: number;
  sourceAmount: number;
  updatedAt: string;
};
