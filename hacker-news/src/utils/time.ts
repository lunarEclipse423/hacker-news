export const convertTime = (unixTimestamp: number) => {
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

export const getHoursPassed = (timePosted: number) => {
  const timePassed = Date.now() - timePosted;
  const hoursPassed = new Date(timePassed * 1000).getHours();
  const resultString = hoursPassed + " " + (hoursPassed > 1 ? "hours" : "hour");
  return resultString;
};

export const showDate = () => {
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
