// utils/streak.helper.ts

/**
 * Calculates the updated streak count based on the previous read timestamp.
 *
 * @param currentStreak - The user's active streak count
 * @param lastReadAt - Timestamp when the user last read an article
 * @param now - Current timestamp (defaults to new Date())
 * @returns Updated streak count
 */
export const calculateNewStreak = (
  currentStreak: number,
  lastReadAt: Date | null,
  now: Date = new Date(),
): number => {
  // First time reading
  if (!lastReadAt) {
    return 1;
  }

  // Normalize dates to midnight to compare calendar days
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastReadDate = new Date(
    lastReadAt.getFullYear(),
    lastReadAt.getMonth(),
    lastReadAt.getDate(),
  );

  const diffInDays = Math.floor((today.getTime() - lastReadDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 1) {
    // Read on consecutive day
    return currentStreak + 1;
  }

  if (diffInDays > 1) {
    // Missed a day or more -> reset to 1
    return 1;
  }

  // Read again on the exact same day -> streak stays the same
  return currentStreak;
};
