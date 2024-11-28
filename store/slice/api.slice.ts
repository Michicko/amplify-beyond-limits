import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN_STORAGE_KEY, BACKEND_PUBLIC_KEY } from "@/config/constants";
import { RootState } from "../store";
import { decrypto } from "@/helpers/encryption";

export const api = createApi({
  reducerPath: "api",
  tagTypes: [
    "Profile",
  ],
  baseQuery: fetchBaseQuery({
    // baseUrl: "${process.env.NEXT_PUBLIC_UMS_BACKEND_URL}/api",
    prepareHeaders: async (headers, { getState }) => {
      const isBrowser = typeof window !== undefined;
      const token =
        (getState() as RootState).auth.token ||
        (isBrowser
          ? sessionStorage.getItem(TOKEN_STORAGE_KEY as string) ||
          sessionStorage.getItem(TOKEN_STORAGE_KEY as string)
          : null);

      if (token && !headers.get("authorization")) {
        const decryptedToken = decrypto(token);
        headers.set("authorization", `Bearer ${decryptedToken}`);
      }
      if (BACKEND_PUBLIC_KEY) {
        headers.set("x-api-key", BACKEND_PUBLIC_KEY);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  // refetchOnFocus: true,
  refetchOnReconnect: true,
});
