export const getFullCurrentDate = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  return currentDate;
};

export const getShortCurrentDate = (): string => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  return currentDate;
};

export const getCommentDate = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };
  const commentDate = date.toLocaleDateString("en-US", options);
  return commentDate;
};
