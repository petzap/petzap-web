"use client";
import React, { useEffect, useState } from "react";
import {
  Flex,
  Grid,
  Button,
  Badge,
  Card,
  Text,
  Avatar,
  Select,
} from "@radix-ui/themes";
import {
  MdOutlineReviews,
  MdOutlineStar,
  MdOutlineAccessTime,
} from "react-icons/md";
import { getReviews } from "@/api/api-call/reporting-api";

interface Review {
  _id: string;
  rating: number;
  review: string;
  media: string[];
  reviewerId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ReviewsResponse {
  message: string;
  data: Review[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState("PENDING");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  useEffect(() => {
    fetchReviews();
  }, [currentPage, currentStatus]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getReviews(currentPage, currentStatus);

      if (response && Array.isArray(response)) {
        setReviews(response);
      } else if (
        response &&
        typeof response === "object" &&
        "data" in response &&
        Array.isArray(response.data)
      ) {
        setReviews(response.data);
        if (
          "pagination" in response &&
          response.pagination &&
          typeof response.pagination === "object"
        ) {
          const paginationData = response.pagination as {
            page: number;
            limit: number;
            total: number;
            pages: number;
          };
          setPagination(paginationData);
        }
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "yellow";
      case "APPROVED":
        return "green";
      case "REJECTED":
        return "red";
      default:
        return "gray";
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

  const handleStatusChange = async (reviewId: string, newStatus: string) => {
    // TODO: Implement status update API call
    console.log(`Updating status for ${reviewId} to ${newStatus}`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <MdOutlineStar
            key={index}
            className={`w-4 h-4 ${
              index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const statusOptions = ["PENDING", "APPROVED", "REJECTED"];

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
            <h1 className="text-2xl font-bold text-gray-800">
              App Reviews & Ratings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and moderate user reviews for your app
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select.Root value={currentStatus} onValueChange={setCurrentStatus}>
              <Select.Trigger placeholder="Filter by status" />
              <Select.Content>
                {statusOptions.map((status) => (
                  <Select.Item key={status} value={status}>
                    {status}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <Grid columns={{ xs: "1", sm: "2", md: "4" }} gap="4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MdOutlineReviews className="text-blue-600" size={20} />
            </div>
            <div>
              <Text size="2" color="gray">
                Total Reviews
              </Text>
              <Text size="4" weight="bold">
                {pagination.total}
              </Text>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MdOutlineStar className="text-yellow-600" size={20} />
            </div>
            <div>
              <Text size="2" color="gray">
                Pending
              </Text>
              <Text size="4" weight="bold">
                {reviews.filter((r) => r.status === "PENDING").length}
              </Text>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MdOutlineStar className="text-green-600" size={20} />
            </div>
            <div>
              <Text size="2" color="gray">
                Approved
              </Text>
              <Text size="4" weight="bold">
                {reviews.filter((r) => r.status === "APPROVED").length}
              </Text>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <MdOutlineStar className="text-red-600" size={20} />
            </div>
            <div>
              <Text size="2" color="gray">
                Rejected
              </Text>
              <Text size="4" weight="bold">
                {reviews.filter((r) => r.status === "REJECTED").length}
              </Text>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="p-8 text-center">
            <Text size="3" color="gray">
              No reviews found
            </Text>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review._id} className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MdOutlineReviews size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <Text size="3" weight="bold" color="gray">
                        App Review
                      </Text>
                      <Text size="2" color="gray">
                        Submitted on {formatDate(review.createdAt)}
                      </Text>
                    </div>
                  </div>
                  <Badge color={getStatusColor(review.status)} variant="soft">
                    {review.status}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <Text
                    size="2"
                    weight="bold"
                    color="gray"
                    className="mb-2 block"
                  >
                    Rating
                  </Text>
                  {renderStars(review.rating)}
                </div>

                {/* Review Content */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <Text
                    size="2"
                    weight="bold"
                    color="gray"
                    className="mb-2 block"
                  >
                    Review Content
                  </Text>
                  <div className="space-y-3">
                    <div>
                      <Text size="2" weight="bold">
                        Review Text:
                      </Text>
                      <Text size="2" className="ml-2">
                        {review.review}
                      </Text>
                    </div>

                    <div className="flex items-center gap-2">
                      <MdOutlineAccessTime size={16} />
                      <Text size="2">
                        Created on {formatDate(review.createdAt)}
                      </Text>
                    </div>

                    {review.media && review.media.length > 0 && (
                      <div>
                        <Text size="2" weight="bold" className="mb-2 block">
                          Attached Media:
                        </Text>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {review.media.map((media, index) => (
                            <img
                              key={index}
                              src={media}
                              alt={`Media ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="soft"
                    color="green"
                    size="2"
                    onClick={() => handleStatusChange(review._id, "APPROVED")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="soft"
                    color="red"
                    size="2"
                    onClick={() => handleStatusChange(review._id, "REJECTED")}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="2"
                    onClick={() =>
                      window.open(`/admin/reviews/${review._id}`, "_blank")
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
      {pagination.pages > 1 && (
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
            Page {currentPage} of {pagination.pages}
          </Text>
          <Button
            variant="outline"
            size="2"
            disabled={currentPage >= pagination.pages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default Reviews;
