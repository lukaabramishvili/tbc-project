import { getSession } from "@auth0/nextjs-auth0";

export async function checkIsAuthenticated() {
  try {
    const session = await getSession();
    return !!session?.user; 
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}
