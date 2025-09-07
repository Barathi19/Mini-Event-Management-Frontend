import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function errorHandler(
  error: unknown,
  errMsg: string = "Something went wrong"
) {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data.message || error.message || errMsg);
  } else {
    console.error(error);
    toast.error(errMsg);
  }
}
