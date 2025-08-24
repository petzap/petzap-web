import { Pagination, User } from "./index";

export interface PostLocation {
  latitude: number;
  longitude: number;
}

export interface ReportedPostItem {
  location: PostLocation;
  _id: string;
  media: string[];
  pet: string;
  description: string;
  hashtags: string[];
  isPublic: boolean;
  owner: string;
  type: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostReporter {
  _id: string;
  email: string;
  fullName: string;
  image: string;
  username: string;
}

export interface PostReport {
  _id: string;
  reporter: User;
  reportedItem: ReportedPostItem | null;
  type: "Post" | "User" | "Pet" | "Comment" | "Review";
  reason: string;
  status: "PENDING" | "RESOLVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostReportsResponse {
  message: string;
  data: PostReport[];
  pagination: Pagination;
}
