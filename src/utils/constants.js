export const API_BASE_URL = "http://localhost/";
export const FETCH_CLIENT_ID = "fetch-client-id";
export const API_VERSION = "/api/v1/";
export const CLIENT_BASE_URL = "http://localhost:5173/";
export const OAUTH_TOKEN = "/oauth/token";
export const DASHBOARD = "/dashboard";
export const NOT_FOUND = "/not-found";
export const GET_USER = "get-user";
export const GET_MODULES = (userId) => `users/${userId}/modules`;
export const LOGOUT = (userId) => `users/${userId}/logout`;
export const SERVER_ERROR = 'server-error';
export const USER_REGISTER = "user/register";
export const CHANGE_PASSWORD = `change-password`;
export const UPDATE_PROFILE = `update-profile`;
export const CHANGE_PASSWORD_URL = (userId) => `users/${userId}/change-password`;
export const UPDATE_PROFILE_URL = (userId) => `users/${userId}/update-profile`;

