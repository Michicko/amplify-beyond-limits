export const thousand = (amount: string | number) => {
  // convert number to string
  let amnt = String(amount).split(".");
  // add commas to numbers before the decimal
  amnt[0] = amnt[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // return comma separated string
  return amnt.join(".");
};

export const amountFormatter = (amount: string) => {
  amount = amount.replace(/^0+/, "");
  if (amount.replace(/\s/g, "").length > 2) {
    return amount.substr(0, amount.length - 2) + "." + amount.substr(-2);
  }
  return amount.replace(/\s/g, "").length ? "0." + amount : amount;
};

export const formatAmt = (val: string) => {
  const formattedVal = val.replaceAll(",", "");
  if (!Number(formattedVal) && formattedVal !== "") {
    return;
  }
  return formattedVal;
};