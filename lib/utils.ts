import { type ClassValue, clsx } from "clsx"
import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDistanceToNowIn3Days(date: Date) {
  const now = new Date();
  const diffDays = differenceInDays(now, date);
  if (diffDays < 3) {
    return formatDistanceToNow(date, { addSuffix: true, locale: zhCN });
  } else {
    return format(date, 'yyyy-MM-dd');
  }
}
