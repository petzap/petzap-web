export interface Review {
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