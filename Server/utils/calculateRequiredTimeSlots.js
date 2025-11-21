const calculateRequiredTimeSlots = (time, durationHours) => {
  const slots = [];
  const startHours = parseInt(time);

  for (let i = 0; i < durationHours; i++) {
    slots.push(startHours + i);
  }
  return slots;
};
export default calculateRequiredTimeSlots;
