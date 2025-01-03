import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "beyondLStore",
  access: (allow) => ({
    "media/*": [
      allow.guest.to(["read", "write", "delete"]),
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});
