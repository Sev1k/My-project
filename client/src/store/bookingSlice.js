import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  customerInfo: {
    fullName: "",
    email: "",
  },
  selectedService: null,
  selectedDate: "",
  selectedTime: "",
  isEditing: false,
  editToken: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
    },
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
    setDateTime: (state, action) => {
      state.selectedDate = action.payload.date;
      state.selectedTime = action.payload.time;
    },
    setEditingBooking: (state, action) => {
      const booking = action.payload;
      state.editToken = booking.manageToken;
      state.isEditing = true;

      state.customerInfo = booking.customerInfo;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    resetBooking: (state) => {
      return initialState;
    },
  },
});

export const {
  setCustomerInfo,
  setSelectedService,
  setDateTime,
  nextStep,
  previousStep,
  resetBooking,
  setEditingBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
