export type TicketStatus = 'Pending' | 'Booked' | 'Cancelled';
export type TravelMode = 'Train' | 'Bus' | 'Flight';

export interface Ticket {
  id: string;
  customerName: string;
  mobileNumber: string;
  from: string;
  to: string;
  travelDate: string;
  mode: TravelMode;
  passengers: number;
  idProof?: string;
  status: TicketStatus;
  notes?: string;
  createdAt: string;
}
