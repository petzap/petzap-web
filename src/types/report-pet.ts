import { Pagination } from "./api";
import { User } from "./user";

export interface PetLocation {
  latitude: number;
  longitude: number;
}

export interface PetReporter {
  _id: string;
  email: string;
  fullName: string;
  image: string;
  username: string;
}

export interface ReportedPetItem {
  location: PetLocation;
  _id: string;
  age: number;
  breed: string;
  image: string;
  dob: string;
  gender: string;
  name: string;
  owner: string;
  petmap: boolean;
  type: string;
  vaccinationInfo: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface PetReport {
  _id: string;
  reporter: User;
  reportedItem: ReportedPetItem | null;
  type: "Post" | "User" | "Pet" | "Comment" | "Review";
  reason: string;
  status: "PENDING" | "RESOLVED" | "REVIEWED";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PetReportsResponse {
  message: string;
  data: PetReport[];
  pagination: Pagination;
}
