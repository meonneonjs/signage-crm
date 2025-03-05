import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(app)/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return user;
} 