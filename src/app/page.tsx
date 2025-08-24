import { getAuthCookies } from "@/utils/cookies";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const authCookies = await getAuthCookies();

  // If not authenticated, redirect to login (handled by middleware)
  if (!authCookies?.accessToken || !authCookies?.user) {
    return null;
  }

  const { user } = authCookies;

  // Show admin dashboard for admin users
  if (user.type === "admin") {
    return redirect("/admin/dashboard");
  }

  // Show super admin dashboard for super admin users
  if (user.type === "superAdmin") {
    return redirect("/super-admin/dashboard");
  }

  // Show user dashboard for other users
  return redirect("/user/dashboard");
}
