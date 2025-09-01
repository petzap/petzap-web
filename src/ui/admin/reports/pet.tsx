"use client";
import React, { useEffect, useState } from "react";
import { Grid, Button, Badge, Card, Text, Avatar } from "@radix-ui/themes";
import {
  MdOutlineReviews,
  MdOutlineLocationOn,
  MdOutlineAccessTime,
  MdOutlinePets,
} from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BsSignpost2 } from "react-icons/bs";
import {
  getReportedPets,
  reportStatusUpdate,
} from "@/api/api-call/reporting-api";
import { PetReport } from "@/types";
import { GiSittingDog } from "react-icons/gi";
import Image from "next/image";

export function ReportedPets() {
  const [reportedPets, setReportedPets] = useState<PetReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState("ALL");

  useEffect(() => {
    fetchReportedPosts();
  }, [currentPage, currentStatus]);

  const fetchReportedPosts = async () => {
    setLoading(true);
    try {
      const response = await getReportedPets(currentPage, currentStatus);
      if (response && Array.isArray(response.data)) {
        setReportedPets(response.data);
      } else {
        setReportedPets([]);
      }
    } catch (error) {
      console.error("Error fetching reported pets:", error);
      setReportedPets([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "yellow";
      case "RESOLVED":
        return "green";
      case "REVIEWED":
        return "blue";
      default:
        return "gray";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Post":
        return <BsSignpost2 size={20} />;
      case "User":
        return <LiaUserFriendsSolid size={20} />;
      case "Pet":
        return <BsSignpost2 size={20} />;
      case "Review":
        return <MdOutlineReviews size={20} />;
      default:
        return <BsSignpost2 size={20} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "RESOLVED" | "REVIEWED"
  ) => {
    const res = await reportStatusUpdate(id, newStatus);
    if (res) {
      setReportedPets((prevReviews: PetReport[]) =>
        prevReviews.map((item: PetReport) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    }
  };

  const statusOptions = ["ALL", "PENDING", "RESOLVED", "REVIEWED"];
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Reported Posts</h1>
            <p className="text-gray-600 mt-1">
              Manage and review reported content from users
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <Grid columns={{ xs: "1", sm: "2", md: "4" }} gap="4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <BsSignpost2 className="text-red-600" size={20} />
            </div>
            <div>
              <Text size="2" color="gray">
                Total Reports
              </Text>
              <Text size="4" weight="bold">
                {reportedPets.length}
              </Text>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <BsSignpost2 className="text-yellow-600" size={20} />
            </div>
            <div>
              <Text size="2" color="gray">
                Pending
              </Text>
              <Text size="4" weight="bold">
                {reportedPets.filter((p) => p.status === "PENDING").length}
              </Text>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BsSignpost2 className="text-green-600" size={20} />
            </div>
            <div>
              <Text size="2" color="gray">
                Resolved
              </Text>
              <Text size="4" weight="bold">
                {reportedPets.filter((p) => p.status === "RESOLVED").length}
              </Text>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BsSignpost2 className="text-blue-600" size={20} />
            </div>
            <div>
              <Text size="2" color="gray">
                Reviewed
              </Text>
              <Text size="4" weight="bold">
                {reportedPets.filter((p) => p.status === "REVIEWED").length}
              </Text>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Reported Pets List */}
      <div className="space-y-4">
        {reportedPets.length === 0 ? (
          <Card className="p-8 text-center">
            <Text size="3" color="gray">
              No reported pets found
            </Text>
          </Card>
        ) : (
          reportedPets.map((pet) => (
            <Card key={pet._id} className="p-6">
              <div className="space-y-4">
                {/* Report Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(pet.type)}
                    </div>
                    <div className="space-y-1">
                      <Text size="3" weight="bold" color="gray">
                        {pet.type} Report
                      </Text>
                      <Text size="2" color="gray" className="pl-1">
                        Reported on {formatDate(pet.createdAt)}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      color={getStatusColor(pet.status)}
                      variant="soft"
                      className="text-xs"
                    >
                      {pet.status}
                    </Badge>
                    <div className="text-right">
                      <Text size="1" color="gray" className="block">
                        Report ID: {pet._id.slice(-8)}
                      </Text>
                      <Text size="1" color="gray" className="block">
                        Updated: {formatDate(pet.updatedAt)}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left Column - Report Information */}
                  <div className="space-y-4">
                    {/* Reporter Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Text
                        size="2"
                        weight="bold"
                        color="gray"
                        className="mb-2 block"
                      >
                        Reporter Information
                      </Text>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={pet.reporter.image}
                          fallback={pet.reporter?.fullName?.charAt(0)}
                          size="5"
                          radius="full"
                        />
                        <div className="flex flex-col space-y-1">
                          <Text size="2" weight="bold">
                            {pet.reporter.fullName}
                          </Text>
                          <Text size="1" color="gray">
                            @{pet.reporter.username}
                          </Text>
                          <Text size="1" color="gray">
                            {pet.reporter.email}
                          </Text>
                        </div>
                      </div>
                    </div>

                    {/* Report Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Text
                        size="2"
                        weight="bold"
                        color="gray"
                        className="mb-2 block"
                      >
                        Report Details
                      </Text>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Text size="2" weight="bold">
                            Reason:
                          </Text>
                          <Text size="2">{pet.reason}</Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Text size="2" weight="bold">
                            Report Type:
                          </Text>
                          <Text size="2">{pet.type}</Text>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Reported Content */}
                  {pet.reportedItem && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Text
                        size="2"
                        weight="bold"
                        color="gray"
                        className="mb-2 block"
                      >
                        Reported Content
                      </Text>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <MdOutlinePets size={16} />
                            <Text size="2">
                              Pet Name: <b>{pet.reportedItem.name}</b>,
                            </Text>
                            <Text size="2">
                              ({pet.reportedItem.age}yrs old{" "}
                              {pet.reportedItem.gender})
                            </Text>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <GiSittingDog size={16} />
                          <Text size="2">Breed: {pet.reportedItem.breed}</Text>
                          <Text size="2">({pet.reportedItem.type})</Text>
                        </div>

                        <div className="flex items-center gap-2">
                          <MdOutlineAccessTime size={16} />
                          <Text size="2">
                            Posted on{" "}
                            {formatDate(pet.reportedItem.createdAt ?? "")}
                          </Text>
                        </div>

                        {pet.reportedItem.location && (
                          <div className="flex items-center gap-2">
                            <MdOutlineLocationOn size={16} />
                            <Text size="2">
                              Location:{" "}
                              {pet.reportedItem.location?.latitude?.toFixed(4)},{" "}
                              {pet.reportedItem.location?.longitude?.toFixed(4)}
                            </Text>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <div>
                            <Text size="2" weight="bold" className="mb-2 block">
                              Media:
                            </Text>
                            <div className="grid grid-cols-2 gap-2">
                              <Image
                                src={pet.reportedItem.image}
                                alt={`Media`}
                                width={100}
                                height={100}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="soft"
                    color="green"
                    size="2"
                    onClick={() => handleStatusChange(pet._id, "RESOLVED")}
                  >
                    Resolve
                  </Button>
                  <Button
                    variant="soft"
                    color="blue"
                    size="2"
                    onClick={() => handleStatusChange(pet._id, "REVIEWED")}
                  >
                    Review
                  </Button>
                  <Button
                    variant="outline"
                    size="2"
                    onClick={() =>
                      window.open(`/admin/reports/${pet._id}`, "_blank")
                    }
                  >
                    View Full Details
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {reportedPets.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <Text size="2" color="gray">
            Page {currentPage}
          </Text>
          <Button
            variant="outline"
            size="2"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
