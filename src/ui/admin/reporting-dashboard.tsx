"use client";
import React, { useEffect, useState } from "react";
import { Flex, Grid } from "@radix-ui/themes";
import { MdOutlineReviews } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BsSignpost2 } from "react-icons/bs";
import { getDashboardStats } from "@/api/api-call/reporting-api";
import { DashboardReportsData } from "@/types";
import Link from "next/link";

export function ReportingUI() {
  const [DashboardStats, setDashboardStats] =
    useState<DashboardReportsData | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    const response = await getDashboardStats();
    if (response) {
      setDashboardStats(response.data);
    }
  };

  const fontSize = "2rem";
  const userOtherInfo = [
    {
      title: "reported users",
      icon: <LiaUserFriendsSolid size={fontSize} />,
      itemLength: DashboardStats?.counts?.users,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "reviews",
      icon: <MdOutlineReviews size={fontSize} />,
      itemLength: DashboardStats?.counts?.reviews,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "reported pets",
      icon: <BsSignpost2 size={fontSize} />,
      itemLength: DashboardStats?.counts?.pets,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "reported posts",
      icon: <BsSignpost2 size={fontSize} />,
      itemLength: DashboardStats?.counts?.posts,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Post":
        return <BsSignpost2 size={16} />;
      case "User":
        return <LiaUserFriendsSolid size={16} />;
      case "Pet":
        return <BsSignpost2 size={16} />;
      case "Review":
        return <MdOutlineReviews size={16} />;
      default:
        return <BsSignpost2 size={16} />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <Flex direction="column" gap="8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-600">
          Monitor and manage reported content and reviews
        </p>
      </div>

      <Grid columns={{ xs: "1", sm: "2", md: "4", lg: "4" }} gap="6">
        {userOtherInfo?.map((item, i) => {
          const getRoute = (title: string) => {
            switch (title) {
              case "reported users":
                return "/admin/reports/users";
              case "reviews":
                return "/admin/reviews";
              case "reported pets":
                return "/admin/reports/pets";
              case "reported posts":
                return "/admin/reports/posts";
              default:
                return "#";
            }
          };

          return (
            <Link key={i} href={getRoute(item.title)} className="block">
              <div
                className={`${item.bgColor} p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105`}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className={`p-4 rounded-full bg-gradient-to-r ${item.color} shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                  >
                    <div className="text-white">{item?.icon || "icon"}</div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm font-medium capitalize tracking-wide">
                      {item.title}
                    </p>
                    <p className="text-gray-900 text-3xl font-bold">
                      {item?.itemLength || 0}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Grid>

      {/* Recent Reported Items Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Recent Reports
          </h3>
          <p className="text-gray-600">
            Latest reported items requiring attention
          </p>
        </div>

        <div className="space-y-4">
          {DashboardStats?.posts?.slice(0, 5).map((report, index) => (
            <div
              key={report._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getTypeIcon(report.type)}
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {report.type}
                  </span>
                </div>

                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-900">
                    Reported by {report.reporter.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Reason: {report.reason}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatTimeAgo(report.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}

          {(!DashboardStats?.posts || DashboardStats.posts.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              <p>No recent reports found</p>
            </div>
          )}
        </div>

        {DashboardStats?.posts && DashboardStats.posts.length > 5 && (
          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
              View All Reports
            </button>
          </div>
        )}
      </div>
    </Flex>
  );
}
