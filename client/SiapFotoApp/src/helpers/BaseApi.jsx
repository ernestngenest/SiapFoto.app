import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const baseApiAuth = axios.create({
  baseURL: "http://localhost:3000",
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
});
