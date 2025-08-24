export interface User {
  _id: string;
  email: string;
  interests: string[];
  otp: string;
  otpExpires: string;
  type: string;
  channels: string[];
  createdAt: string;
  updatedAt: string;
  city: string;
  dob: string;
  fullName: string;
  image: string;
  username: string;
  device: string;
  platform: string;
  token: string;
}
