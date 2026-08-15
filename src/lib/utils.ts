import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLtiCount(lti_count: number): number {
  if (lti_count === 0) {
    return lti_count;
  } else if (lti_count >= 1) {
    return 0;
  } else {
    throw new Error("lti cannot be 'negative'");
  }
}
