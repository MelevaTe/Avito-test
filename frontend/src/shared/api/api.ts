import axios from "axios";
import { API_URL } from "@/shared/config/env/env.ts";

export const $api = axios.create({
  baseURL: API_URL,
});
