"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/api/api-call/auth-api";
import { clearClientAuthCookies } from "@/utils/client-cookies";
import Image from "next/image";
import {
  Menu,
  X,
  BarChart3,
  Users,
  Settings,
  Database,
  Activity,
} from "lucide-react";
import type { User } from "@/types";

interface SuperAdminNavbarProps {
  user?: User;
}

export default function SuperAdminNavbar({ user }: SuperAdminNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearClientAuthCookies();
      closeMenu();
      router.push("/login");
    }
  };

  const navigationItems = [
    { href: "/super-admin/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/super-admin/users", label: "Users", icon: Users },
    { href: "/super-admin/system", label: "System", icon: Database },
    { href: "/super-admin/analytics", label: "Analytics", icon: Activity },
    { href: "/super-admin/settings", label: "Settings", icon: Settings },
  ];

  // Get user display name and avatar
  const getUserDisplayName = () => {
    return user?.fullName || user?.username || "Super Admin";
  };

  const getUserAvatar = () => {
    if (user?.image) {
      return user.image;
    }
    return null;
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-purple-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              href="/super-admin/dashboard"
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="PetZap Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">Super Admin</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Info & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-purple-100">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-purple-300 capitalize">
                    {user.type || "superAdmin"}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  {getUserAvatar() ? (
                    <img
                      src={getUserAvatar()!}
                      alt={getUserDisplayName()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
                      {getUserInitials()}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-300 hover:text-red-200 hover:bg-red-900/20"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-purple-200 hover:text-white hover:bg-purple-800"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-purple-800 border-t border-purple-700">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700 rounded-md transition-colors"
                  onClick={closeMenu}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {user && (
              <div className="pt-4 border-t border-purple-700">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                    {getUserAvatar() ? (
                      <img
                        src={getUserAvatar()!}
                        alt={getUserDisplayName()}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
                        {getUserInitials()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-100">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-purple-300">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-300 hover:text-red-200 hover:bg-red-900/20"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
