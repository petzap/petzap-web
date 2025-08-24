import { User } from "./user";

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  ownerId: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}
