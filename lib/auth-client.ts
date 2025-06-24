import { createAuthClient } from "better-auth/react";

const getDevOrProd = process.env.NODE_ENV;
let baseURL = "";

if (getDevOrProd === "development") {
  baseURL = "http://localhost:3001";
} else {
  baseURL = "https://www.allscreen.ovh";
}

export const authClient = createAuthClient({
  baseURL: baseURL,
});
