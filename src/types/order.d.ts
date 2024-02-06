export type TOrderData = {
  BUYER_EMAIL: string;
  BUYER_NAME: string;
  CHANNEL: string;
  CHANNEL_NAME: string;
  CURRENCY_CODE: string;
  EAN: any;
  ITEM_PRICE: number;
  ITEM_TAX: number;
  ORDER_DATE: number;
  ORDER_ID: string;
  ORDER_ITEM_ID: number;
  ORDER_STATUS: string;
  ORDER_TOTAL: number;
  PAYMENT_STATUS: string;
  QUANTITY_PURCHASED: number;
  SELRO_ORDER_ID: number;
  SHIPPING_CARRIER: string;
  SHIPPING_COST: number;
  SHIPPING_METHOD: string;
  SHIP_ADDRESS_1: string;
  SHIP_ADDRESS_2: string;
  SHIP_CITY: string;
  SHIP_COUNTRY: string;
  SHIP_COUNTRY_CODE: string;
  SHIP_POSTALCODE: string;
  SHIP_STATE: string;
  SITE: string;
  SKU: string;
  SUB_TOTAL: number;
  TITLE: string;
  TOTAL_PRICE: number;
  UPC: number;
  WEIGHT_KG: number;
};

export type TOrderKeys =
  | "BUYER_EMAIL"
  | "BUYER_NAME"
  | "CHANNEL"
  | "CHANNEL_NAME"
  | "CURRENCY_CODE"
  | "EAN"
  | "ITEM_PRICE"
  | "ITEM_TAX"
  | "ORDER_DATE"
  | "ORDER_ID"
  | "ORDER_ITEM_ID"
  | "ORDER_STATUS"
  | "ORDER_TOTAL"
  | "PAYMENT_STATUS"
  | "QUANTITY_PURCHASED"
  | "SELRO_ORDER_ID"
  | "SHIPPING_CARRIER"
  | "SHIPPING_COST"
  | "SHIPPING_METHOD"
  | "SHIP_ADDRESS_1"
  | "SHIP_ADDRESS_2"
  | "SHIP_CITY"
  | "SHIP_COUNTRY"
  | "SHIP_COUNTRY_CODE"
  | "SHIP_POSTALCODE"
  | "SHIP_STATE"
  | "SITE"
  | "SKU"
  | "SUB_TOTAL"
  | "TITLE"
  | "TOTAL_PRICE"
  | "UPC"
  | "WEIGHT_KG";

export interface IOrderTypes {
  pending: number;
  shipped: number;
  unshipped: number;
  cancelled: number;
  missing_weight: number;
  missing_carrier: number;
  missing_service: number;
}


export type OrderTypes = {
  pending: { count: number; orders: any[] };
  shipped: { count: number; orders: any[] };
  unshipped: { count: number; orders: any[] };
  cancelled: { count: number; orders: any[] };
  missing_weight: { count: number; orders: any[] };
  missing_carrier: { count: number; orders: any[] };
  missing_service: { count: number; orders: any[] };
};