// app/api/auth/[...nextauth]/route.ts

import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";

// Разширете Session интерфейса, за да включите googleId
declare module "next-auth" {
  interface Session {
   
    user: {
      googleId?: string;
      id?: string;
      accessToken?: string | undefined | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        const now = new Date();

        try {
          await prisma.user.upsert({
            where: { googleId: token.sub },
            update: {
              name: session.user.name || undefined,
              email: session.user.email || undefined,
              updatedAt: now,
              accessToken: token.access_token || "",
              refreshToken: token.refresh_token || "",
              accessTokenExp: token.exp as number,
            },
            create: {
              name: session.user.name || "",
              email: session.user.email || "",
              googleId: token.sub,
              accessToken: token.access_token as string,
              refreshToken: token.refresh_token as string,
              accessTokenExp: token.exp as number,
              createdAt: now,
              updatedAt: now,
            },
          });

          //console.log("TOKEN", token)

          session.user.googleId = token.sub;
          session.user.accessToken = token.access_token as string
        } catch (error) {
          console.error("Error creating/updating user", error);
        }
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);



export { handler as GET, handler as POST };