import { Printer } from "../index";

// map windows-printer key to final printerData key
const properties: { [key: string]: keyof Printer } = {
  Status: "status",
  DeviceID: "deviceId",
  Name: "name",
  PrinterPaperNames: "paperSizes",
};

export default function isValidPrinter(printer: string): {
  isValid: boolean;
  printerData: Printer;
} {
  const printerData: Printer = {
    status: "",
    deviceId: "",
    name: "",
    paperSizes: [],
  };

  printer.split(/\r?\n/).forEach((line) => {
    let [label, value] = line.split(":").map((el) => el.trim());

    // handle array dots
    if (value.match(/^{(.*)(\.{3})}$/)) {
      value = value.replace("...}", "}");
    }

    // handle array returns
    const matches = value.match(/^{(.*)}$/);

    if (matches && matches[1]) {
      // @ts-ignore
      value = matches[1].split(", ");
    }

    const key = properties[label];

    if (key === undefined) return;

    // @ts-ignore
    printerData[key] = value;
  });

  const isValid = !!(printerData.deviceId && printerData.name);

  return {
    isValid,
    printerData,
  };
}
