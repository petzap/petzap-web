import { redirect } from "next/navigation";
import { getAuthCookies } from "@/utils/cookies";
import { Button } from "@/components/ui/button";
import {
  Users,
  Settings,
  BarChart3,
  Calendar,
  Home,
  LogOut,
  Shield,
  Database,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCookies = await getAuthCookies();

  // Redirect if not authenticated or not super admin
  if (!authCookies?.user || authCookies.user.type !== "superAdmin") {
    redirect("/login");
  }

  const { user } = authCookies;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-purple-200" />
            <h1 className="text-2xl font-bold">PetZap Super Admin</h1>
          </div>
          <p className="text-sm text-purple-200 mt-1">
            Welcome back, {user.fullName}
          </p>
        </div>

        <nav className="px-4 pb-4">
          <div className="space-y-2">
            <Link href="/super-admin/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-white hover:bg-purple-700"
              >
                <BarChart3 className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
            </Link>

            <Link href="/super-admin/admins">
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-white hover:bg-purple-700"
              >
                <Shield className="w-4 h-4 mr-3" />
                Manage Admins
              </Button>
            </Link>

            <Link href="/super-admin/users">
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-white hover:bg-purple-700"
              >
                <Users className="w-4 h-4 mr-3" />
                All Users
              </Button>
            </Link>

            <Link href="/super-admin/pets">
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-white hover:bg-purple-700"
              >
                <Calendar className="w-4 h-4 mr-3" />
                All Pets
              </Button>
            </Link>

            <Link href="/super-admin/analytics">
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-white hover:bg-purple-700"
              >
                <Activity className="w-4 h-4 mr-3" />
                Analytics
              </Button>
            </Link>

            <Link href="/super-admin/system">
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-white hover:bg-purple-700"
              >
                <Database className="w-4 h-4 mr-3" />
                System
              </Button>
            </Link>

            <Link href="/super-admin/settings">
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-white hover:bg-purple-700"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
            </Link>
          </div>
        </nav>

        <div className="px-4 mt-auto">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-left text-white hover:bg-purple-700"
            >
              <Home className="w-4 h-4 mr-3" />
              Back to Home
            </Button>
          </Link>

          <form action="/api/auth/logout" method="POST">
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start text-left text-red-300 hover:text-red-100 hover:bg-red-600"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Super Admin Panel
              </h2>
              <p className="text-sm text-gray-600">
                Full platform control & management
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user.fullName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Super Admin
                </span>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
