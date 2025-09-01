"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, PawPrint, StarIcon, Shield, Settings } from "lucide-react";
import Link from "next/link";
import { Select } from "@radix-ui/themes";

import { useEffect, useState } from "react";
import { getFilteredStates } from "@/api/api-call/reporting-api";
import { FilteredStats, FilteredStatsCounts } from "@/types/filters";
import { MdOutlineReport } from "react-icons/md";
import { BsSignpost2 } from "react-icons/bs";

export function AdminDashboard() {
  const [selectedFilter, setSelectedFilter] = useState<string>("week");
  const [stats, setStats] = useState<FilteredStats | null>(null);
  const [itemLength, setItemLength] = useState<FilteredStatsCounts | null>(
    null
  );

  const getFilteredData = async () => {
    const res = await getFilteredStates(selectedFilter);
    if (res) {
      setStats(res?.data as FilteredStats);
      setItemLength(res.counts as FilteredStatsCounts);
    }
  };

  useEffect(() => {
    getFilteredData();
  }, [selectedFilter]);

  const filters = [
    { id: "1", name: "day" },
    { id: "2", name: "week" },
    { id: "3", name: "month" },
  ];
  const data = [
    {
      title: "Users",
      value: stats ? stats.user.length : "—",
      total: itemLength ? itemLength.users : "—",
      percent:
        stats && itemLength && itemLength.users > 0
          ? Math.min(
              100,
              Math.round((stats.user.length / itemLength.users) * 100)
            )
          : 0,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      url: "/admin/users",
    },
    {
      title: " Pets",
      total: itemLength ? itemLength.pets : "—",
      value: stats ? stats.pet.length : "—",
      percent:
        stats && itemLength && itemLength.pets > 0
          ? Math.round((stats.pet.length / itemLength.pets) * 100)
          : 0,
      icon: <PawPrint className="h-4 w-4 text-muted-foreground" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      url: "/admin/pets",
    },
    {
      title: "Active Posts",
      total: itemLength ? itemLength.posts : "—",
      value: stats ? stats.post.length : "—",
      percent:
        stats && itemLength && itemLength.posts > 0
          ? Math.round((stats.post.length / itemLength.posts) * 100)
          : 0,
      icon: <BsSignpost2 className="h-5 w-5 text-muted-foreground" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Reports",
      total: itemLength ? itemLength.reports : "—",
      value: stats ? stats.report : "—",
      percent:
        stats && itemLength && itemLength.reports > 0
          ? Math.round((stats.report?.length / itemLength.reports) * 100)
          : 0,
      icon: <MdOutlineReport className="h-5 w-5 text-muted-foreground" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      url: "/admin/reports",
    },
    {
      title: "Reviews",
      total: itemLength ? itemLength.reviews : "—",
      value: stats ? stats.review?.length : "—",
      percent:
        stats && itemLength && itemLength.reviews > 0
          ? Math.round((stats.review?.length / itemLength.reviews) * 100)
          : 0,
      icon: <StarIcon className="h-4 w-4 text-muted-foreground" />,
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      url: "/admin/reviews",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex w-full justify-between items-center flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your pet community and users</p>
        </div>
        <Select.Root
          size="3"
          value={selectedFilter}
          onValueChange={(val) => setSelectedFilter(val)}
        >
          <Select.Trigger />
          <Select.Content className="!min-w-32">
            {filters.map((filter) => (
              <Select.Item key={filter.id} value={filter.name}>
                last {filter.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {data.map((item, index) => (
          <Link href={item.url || "#"} key={index}>
            <Card
              className={`${item.bgColor} ${item.iconColor} hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total {item.title}
                </CardTitle>
                {item.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item?.total || 0}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="font-bold ">{item.percent || 0}%</span> last{" "}
                  {selectedFilter} stats
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registration</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
                <Badge variant="secondary">User</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Pet profile created</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
                <Badge variant="secondary">Pet</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Content reported</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
                <Badge variant="destructive">Report</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/admin/users" className="w-full block">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/reviews" className="w-full block">
                <Button className="w-full justify-start" variant="outline">
                  <StarIcon className="mr-2 h-4 w-4" />
                  App Reviews / Ratings
                </Button>
              </Link>
              <Link href="/admin/posts" className="w-full block">
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Content Moderation
                </Button>
              </Link>
              <Link href="/admin/settings" className="w-full block">
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
