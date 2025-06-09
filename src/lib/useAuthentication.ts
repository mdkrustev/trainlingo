// lib/useAuthentication.ts
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function authenticate() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return {
      error: "Unauthorized",
      status: 401,
      user: null,
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return {
      error: "User not found",
      status: 404,
      user: null,
    };
  }

  return {
    user,
    error: null,
    status: 200,
  };
}