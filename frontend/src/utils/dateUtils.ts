export const getLastMessagePeriod = (dateStr: string) => {
  const timestamp = new Date(dateStr).getTime();
  const now = new Date().getTime();
  const diff = (now - timestamp) / 1000; // Time difference in seconds

  if (diff < 60) {
    return Math.floor(diff) + "s ago";
  } else if (diff < 3600) {
    return Math.floor(diff / 60) + "m ago";
  } else if (diff < 86400) {
    return Math.floor(diff / 3600) + "h ago";
  } else {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }
};
