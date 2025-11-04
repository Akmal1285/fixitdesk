import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TicketStatus = 'Open' | 'In-progress' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category?: string;
  customerName?: string;
  createdAt: string;
  status: TicketStatus;
  priority: TicketPriority;
  attachments: string[];
}

interface TicketState {
  tickets: Ticket[];
}

const initialState: TicketState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    createTicket(
      state,
      action: PayloadAction<Omit<Ticket, 'id' | 'createdAt'>>,
    ) {
      state.tickets.push({
        ...action.payload,
          id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        attachments: action.payload.attachments ?? [],
        status: action.payload.status ?? 'open',
        priority: action.payload.priority ?? 'medium',
      });
    },
    updateTicketStatus(
      state,
      action: PayloadAction<{ id: string; status: TicketStatus }>,
    ) {
      const ticket = state.tickets.find(t => t.id === action.payload.id);
      if (ticket) ticket.status = action.payload.status;
    },
    addAttachment(state, action: PayloadAction<{ id: string; uri: string }>) {
      const ticket = state.tickets.find(t => t.id === action.payload.id);
      if (ticket) ticket.attachments.push(action.payload.uri);
    },
  },
});

export const { createTicket, updateTicketStatus, addAttachment } =
  ticketSlice.actions;

export default ticketSlice.reducer;
