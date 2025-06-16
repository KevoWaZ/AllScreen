"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const someAuthenticatedAction = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "user@email.com",
      password: "password",
    },
  });
};

export const checkSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const user = {
      id: session.user.id,
      username: session.user.name,
    };
    return user;
  } else {
    return false;
  }
};
