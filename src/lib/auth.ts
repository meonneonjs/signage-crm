// Temporarily disabled Clerk auth
// import { auth } from "@clerk/nextjs";

import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import GoogleProvider from 'next-auth/providers/google';
import { User } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.name = token.name || null;
        session.user.email = token.email || null;
        session.user.image = token.picture as string | null;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email || '',
        },
      });

      if (!dbUser) {
        if (user) {
          token.sub = user.id;
        }
        return token;
      }

      return {
        sub: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.avatar,
      };
    },
  },
};

export async function getAuthSession() {
  // Temporarily return a mock session
  return {
    userId: "temp-user-id"
  };
}

export async function requireAuth() {
  // Temporarily return a mock session
  return {
    userId: "temp-user-id"
  };
} 