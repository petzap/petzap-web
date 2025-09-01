import { Pet } from "./pet";
import { User } from "./user";

// Dashboard Reports Types
export interface Location {
  latitude: number;
  longitude: number;
}

export interface MediaItem {
  url: string;
}

export interface ReportedPost {
  _id: string;
  location: Location;
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

export interface Reporter {
  _id: string;
  email: string;
  fullName: string;
  image: string;
  username: string;
}

export interface Report {
  _id: string;
  reporter: Reporter;
  reportedItem: ReportedPost | null;
  type: "Post" | "User" | "Pet" | "Comment" | "Review";
  reason: string;
  status: "PENDING" | "RESOLVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  _id: string;
  content: string;
  author: string;
  post: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Review {
  _id: string;
  rating: number;
  review: string;
  media: string[];
  reviewer: {
    _id: string;
    username: string;
    image: string;
    fullName: string;
    email: string;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DashboardCounts {
  users: number;
  pets: number;
  posts: number;
  comments: number;
  reviews: number;
}

export interface DashboardReportsData {
  users: User[];
  pets: Pet[];
  posts: Report[];
  comments: Comment[];
  reviews: Review[];
  counts: DashboardCounts;
}

export interface DashboardReportsResponse {
  message: string;
  data: DashboardReportsData;
}
