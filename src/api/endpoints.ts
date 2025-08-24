// Auth Endpoints
const LOGIN_ENDPOINT = "/auth/login";
const LOGOUT_ENDPOINT = "/auth/logout";
const VALIDATE_USERNAME_ENDPOINT = "/auth/register/username";
const REGISTER_ENDPOINT = "/auth/register";
const VERIFY_OTP_ENDPOINT = "/auth/register/otp-verify";
const RESEND_OTP_ENDPOINT = "/auth/register/otp-resend";
const COMPLETE_PROFILE_ENDPOINT = "/auth/register/profile-update";
const FORGOT_PASSWORD_ENDPOINT = "/auth/forgot-password-otp";
const VERIFY_RESET_OTP_ENDPOINT = "/auth/validate-otp";
const RESET_PASSWORD_ENDPOINT = "/auth/reset-password";

// Profile Endpoints
const PROFILE_ENDPOINT = "/profile";
const CHANGE_PASSWORD_ENDPOINT = "/profile/change-password";

// User Endpoints
const USERS_ENDPOINT = "/users";

// Admin endpoints
const REVIEWS_ENDPOINT = "/dashboard/reviews";
const USER_ENDPOINT = "/dashboard/user-reports";
const REPORT_STATUS_UPDATE_ENDPOINT = "/dashboard/report";
const PET_ENDPOINT = "/dashboard/pet-reports";
const POST_ENDPOINT = "/dashboard/post-reports";
const COMMENT_ENDPOINT = "/dashboard/comment-reports";
const DASHBOARD_STATS = "/dashboard/stats";

// Friends Endpoints
const GET_FRIENDS_ENDPOINT = "/friend";
const ADD_FRIEND_REQUEST_ENDPOINT = "/friend/request";
const ACCEPT_FRIEND_REQUEST_ENDPOINT = "/friend/accept";
const REJECT_FRIEND_REQUEST_ENDPOINT = "/friend/reject";
const CANCEL_FRIEND_REQUEST_ENDPOINT = "/friend/cancel";
const GET_FRIEND_REQUESTS_ENDPOINT = "/friend/requests";
const GET_SENT_REQUESTS_ENDPOINT = "/friend/sent-requests";

// Block Endpoints
const BLOCK_REQUESTS_ENDPOINT = "/block";

// Follow Endpoints
const FOLLOW_ENDPOINT = "/follow";

// Pet Endpoints
const PETS_ENDPOINT = "/pets";
const FOLLOW_PET_ENDPOINT = "/follow/pet";
const EDIT_PETMAP_ENDPOINT = "/pets/petmap";

// Post Endpoints
const POSTS_ENDPOINT = "/posts";
const GET_PUBLIC_POSTS_ENDPOINT = "/posts";
const LIKE_POSTS_ENDPOINT = "/posts";

// Comment Endpoints
const GET_COMMENTS_ENDPOINT = "/comments/post";
const COMMENTS_ENDPOINT = "/comments";

// Notification Endpoint
const NOTIFICATIONS = "/notifications";

// Chat Endpoints
const CHAT_SEND_ENDPOINT = "/chat/send";
const CHANNEL_ENDPOINT = "/chat/channel";

export {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
  VERIFY_OTP_ENDPOINT,
  RESEND_OTP_ENDPOINT,
  COMPLETE_PROFILE_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
  VERIFY_RESET_OTP_ENDPOINT,
  RESET_PASSWORD_ENDPOINT,
  PROFILE_ENDPOINT,
  CHANGE_PASSWORD_ENDPOINT,
  PETS_ENDPOINT,
  GET_FRIENDS_ENDPOINT,
  ACCEPT_FRIEND_REQUEST_ENDPOINT,
  REJECT_FRIEND_REQUEST_ENDPOINT,
  EDIT_PETMAP_ENDPOINT,
  POSTS_ENDPOINT,
  GET_PUBLIC_POSTS_ENDPOINT,
  COMMENTS_ENDPOINT,
  ADD_FRIEND_REQUEST_ENDPOINT,
  FOLLOW_PET_ENDPOINT,
  USERS_ENDPOINT,
  NOTIFICATIONS,
  FOLLOW_ENDPOINT,
  VALIDATE_USERNAME_ENDPOINT,
  CANCEL_FRIEND_REQUEST_ENDPOINT,
  GET_FRIEND_REQUESTS_ENDPOINT,
  GET_SENT_REQUESTS_ENDPOINT,
  LIKE_POSTS_ENDPOINT,
  BLOCK_REQUESTS_ENDPOINT,
  REVIEWS_ENDPOINT,
  DASHBOARD_STATS,
  USER_ENDPOINT,
  PET_ENDPOINT,
  POST_ENDPOINT,
  COMMENT_ENDPOINT,
  REPORT_STATUS_UPDATE_ENDPOINT,
  GET_COMMENTS_ENDPOINT,
  CHAT_SEND_ENDPOINT,
  CHANNEL_ENDPOINT,
};
