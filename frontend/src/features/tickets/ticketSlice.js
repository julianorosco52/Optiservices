
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  ticket: null,
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    getTicketsSuccess: (state, action) => {
      state.tickets = action.payload;
    },
    getTicketSuccess: (state, action) => {
      state.ticket = action.payload;
    },
    createTicketSuccess: (state, action) => {
      state.tickets.push(action.payload);
    },
    updateTicketSuccess: (state, action) => {
      const index = state.tickets.findIndex(
        (ticket) => ticket._id === action.payload._id
      );
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    deleteTicketSuccess: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket._id !== action.payload
      );
    },
  },
});

export const {
  getTicketsSuccess,
  getTicketSuccess,
  createTicketSuccess,
  updateTicketSuccess,
  deleteTicketSuccess,
} = ticketSlice.actions;

export default ticketSlice.reducer;
