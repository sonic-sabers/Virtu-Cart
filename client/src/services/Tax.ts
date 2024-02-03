export const FindTax = (name: string, price: number) => {
  let tax = 0,
    taxname = "";
  if (name === "product") {
    if (price > 1000 && price <= 5000) {
      tax = Number((0.12 * price).toFixed(2)) + 200;
      taxname = "PA, PC";
    } else if (price > 5000) {
      tax = Number((0.18 * price).toFixed(2)) + 200;
      taxname = "PB, PC";
    } else {
      tax = 200;
      taxname = "PC";
    }
  }
  if (name === "service") {
    if (price > 1000 && price <= 8000) {
      tax = Number((0.1 * price).toFixed(2)) + 100;
      taxname = "SA, SC";
    } else if (price > 8000) {
      tax = Number((0.15 * price).toFixed(2)) + 100;
      taxname = "SB, SC";
    } else {
      tax = 100;
      taxname = "SC";
    }
  }
  return { tax, taxname }; // Return an object with tax and taxname properties
};
