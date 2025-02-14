export { default as print } from "./print/print";
export { default as getPrinters } from "./get-printers/get-printers";
export { default as getDefaultPrinter } from "./get-default-printer/get-default-printer";
export { PrintOptions } from "./print/print";

export type Printer = {
  status: string;
  deviceId: string;
  name: string;
  paperSizes: string[];
};
