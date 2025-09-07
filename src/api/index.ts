import { API_CONSTANT } from "@/constant/api.constant";
import axios from "axios";

export const ApiInstance = axios.create({ baseURL: API_CONSTANT.baseURL });
