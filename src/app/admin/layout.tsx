import { redirect } from "next/navigation";
import { getAuthCookies } from "@/utils/cookies";
import { AdminNavbar } from "@/ui/admin/navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCookies = await getAuthCookies();

  // Redirect if not authenticated or not admin
  if (!authCookies?.user || authCookies.user.type !== "admin") {
    redirect("/login");
  }

  const { user } = authCookies;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <AdminNavbar user={user} />

      {/* Main Content - Added top padding for fixed navbar */}
      <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
