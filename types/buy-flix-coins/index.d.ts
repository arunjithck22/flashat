export interface FlixPackageModal {
  flax: number;
  coins: number;
  discounted_price: number;
  discount_percentage: number;
  id: number;
  price: number;
  time_created: string; // ISO 8601 formatted date string
  time_updated: string; // ISO 8601 formatted date string
}
export interface CoinPackageModal {
  coins: number;
  discounted_price: number;
  discount_percentage: number;
  id: number;
  price: number;
  time_created: string; // ISO 8601 formatted date string
  time_updated: string; // ISO 8601 formatted date string
}
