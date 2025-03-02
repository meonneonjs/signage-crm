// Temporarily disabled Clerk auth
// import { auth } from "@clerk/nextjs";

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