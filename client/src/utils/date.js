export const getCurrentDate = new Date().toLocaleDateString("en-PH", {
  timeZone: "Asia/Manila",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const getCurrentDay = new Date().toLocaleString("en-PH", {
  timeZone: "Asia/Manila",
  weekday: "long",
});

// converts date in format mm/dd/yyyy to ISO format compatible with mongoDB (YYYY-MM-DDTHH:mm:ss.sssZ)
export const convertToISOFormat = (dateString) => {
  const [month, day, year] = dateString.split("/");

  const date = new Date(`${year}-${month}-${day}`);

  return date.toISOString();
};

export const formatToMMDDYYYY = (isoDateString) => {
  if (!isoDateString) {
    return "";
  }
  const date = new Date(isoDateString);

  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const YYYY = date.getFullYear();

  return `${MM}/${DD}/${YYYY}`;
};

export const formatToMDY = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
