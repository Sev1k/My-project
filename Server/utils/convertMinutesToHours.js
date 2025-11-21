const convertMinutesToHours = (minuteString) => {
  const minutes = parseInt(minuteString.replace(" min", ""));
  if (isNaN(minutes) || minutes <= 0) {
    throw new Error("invalid duration format");
  }
  return Math.ceil(minutes / 60);
};
export default convertMinutesToHours;
