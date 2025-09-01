import { Pagination } from "./api";
import { Pet } from "./pet";
import { PostItem } from "./report-post";
import { Review } from "./reviews";
import { User } from "./user";

interface report {
  _id: string;
  _v: number;
  reporter: User;
  reason: string;
  reportedItem: string;
  tpe: string;
  status: string;
}

export interface FilteredStats {
  user: User[];
  pet: Pet[];
  post: PostItem[];
  report: report[];
  review: Review[];
}

export interface FilteredStatsCounts {
  users:number;
  pets:number;
  posts:number;
  reports:number;
  reviews:number;
}

export interface FilteredStatsResponse {
  counts: FilteredStatsCounts;
  message: string;
  data: FilteredStats;
  pagination: Pagination;
}
