import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")     // Remove special characters
    .replace(/[\s_-]+/g, "-")     // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, "");     // Trim leading/trailing hyphens
};