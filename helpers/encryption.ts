import CryptoJS from "crypto-js";
import { BACKEND_PRIVATE_KEY, BACKEND_PUBLIC_KEY } from "@/config/constants";

const APP_KEY = process.env.NEXT_PUBLIC_TOKEN_ENCRYPTION_KEY ?? "";
const PUBLIC_KEY = BACKEND_PUBLIC_KEY ?? "";
const PRIVATE_KEY = BACKEND_PRIVATE_KEY ?? "";

/**
 * This is used to encrypt data, the function uses the AES algorithm to encrypt the
 * passed data into a string. To ensure whatever is passed is encrypted, data is
 * first converted to JSON and then after that the passed data gets encrypted
 * @param data any
 * @param key string
 */
export function encrypto(data: any, key: string = APP_KEY): string | undefined {
  try {
    // encrypt data and return as a string
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

/**
 * This is used to decrypt encrypted data, function uses the AES algorithm to decrypt the
 * passed back to understandable data. It is also assumed that the encrypted data was first
 * converted to JSON before encryption to a JSON parse will be attempted on the cypher text
 * after decryption.
 * @param data string
 * @param key string
 */
export function decrypto<R = any>(
  cypherText: string,
  key: string = APP_KEY
): R | undefined | string {
  try {
    // decrypt cypher text to bytes
    const bytes = CryptoJS.AES.decrypt(cypherText, key);
    // JSON parse decrypted cypher text and return as original data
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.log(e);
    console.error(e);
    // return undefined;
    return cypherText;
  }
}

/**
 * This is used to encrypt the body of a request
 * @param data any
 * @param key string
 */
export function encryptReqBody(
  data: any,
  files?: any
): { encrypted?: string; files?: any } | undefined {
  try {
    if (data) {
      const val = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
      //@ts-ignore
      const encrypted = CryptoJS.AES.encrypt(val, PRIVATE_KEY, { iv: PUBLIC_KEY }).toString();
      const b64 = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex);

      return { encrypted: b64, files };
    }

    return { files };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}


export function encryptReqBodyPay(
  data: any,
  files?: any
): { encrypted?: string; files?: any } | undefined {
  try {
    if (data) {
      const val = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
      //@ts-ignore
      const encrypted = CryptoJS.AES.encrypt(val, BACKEND_PRIVATE_KEY, { iv: BACKEND_PUBLIC_KEY }).toString();
      const b64 = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex);

      return { encrypted: b64, files };
    }

    return { files };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const groupEntries = (fileForm: FormData) => {
  const obj = {};
  fileForm.forEach((value, key) => {
    // console.log({ value, key });
    //@ts-ignore
    if (obj[key]) {
      //@ts-ignore
      const val = obj[key];

      if (typeof val === "string") {
        //@ts-ignore
        obj[key] = [val, value];
      } else {
        //@ts-ignore
        obj[key] = [...val, value];
      }
    } else {
      //@ts-ignore
      obj[key] = [value];
    }
  });
  // console.log({ obj });
  return obj;
};
