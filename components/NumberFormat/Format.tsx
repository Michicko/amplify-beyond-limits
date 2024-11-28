export default function Format(num: any) {
  const options = { maximumFractionDigits: 2 };
  const formattedNumber = Intl.NumberFormat("en-US", options).format(num);

  return formattedNumber;
}
