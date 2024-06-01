export interface SeriesData {
  datetime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockInfo {
  title: string;
  symbol: string;
  last_update: string;
  data: SeriesData[];
}

export interface CompanyStockInfo {
  symbol: string;
  company: string;
  type: string;
  price: number;
  currency: string;
  region: string;
  timezone: string;
  last_trade: string;
  change: number;
}
