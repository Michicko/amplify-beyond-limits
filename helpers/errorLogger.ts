export default function ErrorLogger(error: any) {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
}
