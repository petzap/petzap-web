"use server";

import { serverAction } from "@/api/server-action";
import { DASHBOARD_STATS, REVIEWS_ENDPOINT } from "../endpoints";
import toast from "react-hot-toast";
import {
  DashboardReportsResponse,
  ApiError,
  PostReportsResponse,
  UserReportsResponse,
  PetReportsResponse,
} from "@/types";
import { FilteredStatsResponse } from "@/types/filters";

export const getDashboardStats = async () => {
  try {
    const response = await serverAction<DashboardReportsResponse>({
      url: DASHBOARD_STATS,
      method: "GET",
    });
    if (response.state && response.data) {
      return response.data as DashboardReportsResponse;
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};

export const getReportedPosts = async (page: number, type: string) => {
  try {
    const response = await serverAction({
      url: `/dashboard/post-reports?page=${page}&limit=10?status=${type}`,
      method: "GET",
    });
    if (response.state && response.data) {
      return response.data as PostReportsResponse;
    }
  } catch (error) {
    console.error("Error fetching reported posts:", error);
    return null;
  }
};

export const getReportedUsers = async (page: number, type: string) => {
  try {
    const response = await serverAction({
      url: `/dashboard/user-reports?page=${page}&limit=10?status=${type}`,
      method: "GET",
    });
    if (response.state && response.data) {
      return response.data as UserReportsResponse;
    }
  } catch (error) {
    console.error("Error fetching reported users:", error);
    return null;
  }
};

export const getReviews = async (page: number, type: string) => {
  try {
    const response = await serverAction({
      url: `/dashboard/reviews?page=${page}&limit=10?status=${type}`,
      method: "GET",
    });
    if (response.state && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};

export const getReportedPets = async (page: number, type: string) => {
  try {
    const response = await serverAction({
      url: `/dashboard/pet-reports?page=${page}&limit=10?status=${type}`,
      method: "GET",
    });
    if (response.state && response.data) {
      return response.data as PetReportsResponse;
    }
  } catch (error) {
    console.error("Error fetching reported pets:", error);
    return null;
  }
};

export const reportStatusUpdate = async (id: string, status: string) => {
  try {
    const response = await serverAction({
      url: `/dashboard/report/${id}`,
      method: "PUT",
      body: { status },
    });
    if (response.state && response.data) {
      return response.data;
    }
  } catch (error) {
    const apiError = error as ApiError;
    toast.error(apiError.response?.data?.message || "An error occurred");
    console.error("Error during submission:", error);
    return null;
  }
};

export const reviewStatusUpdate = async (id: string, status: string) => {
  try {
    const response = await serverAction({
      url: `${REVIEWS_ENDPOINT}/${id}`,
      method: "PUT",
      body: { status },
    });
    if (response.state && response.data) {
      return response.data;
    }
  } catch (error) {
    const apiError = error as ApiError;
    toast.error(apiError.response?.data?.message || "An error occurred");
    console.error("Error during submission:", error);
    return null;
  }
};

export const getFilteredStates = async (selectedFilter: string) => {
  try {
    const response = await serverAction({
      url: `/dashboard/latest-entities-stats?period=${selectedFilter}`,
      method: "GET",
    });

    if (response?.state && response?.data) {
      return response.data as FilteredStatsResponse;
    }
  } catch (error) {
    const apiError = error as ApiError;
    toast.error(apiError.response?.data?.message || "An error occurred");
    console.error("Error during submission:", error);
  }
};
