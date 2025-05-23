import { createAuthClient } from "better-auth/react";

let getDevOrProd = process.env.NODE_ENV;
let baseURL = "";

if (getDevOrProd === "development") {
  baseURL = "http://localhost:3001";
} else {
  baseURL = "https://allscreen.ovh/";
}

export const authClient = createAuthClient({
  baseURL: baseURL,
});
