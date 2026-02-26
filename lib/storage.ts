import { Ticket } from "./types";

const STORAGE_KEY = 'ticket_agent_tickets';

export function getTickets(): Ticket[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading tickets from storage", error);
    return [];
  }
}

export function saveTickets(tickets: Ticket[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch (error) {
    console.error("Error saving tickets to storage", error);
  }
}

export function addTicket(ticket: Omit<Ticket, 'id' | 'createdAt'>): Ticket {
  const tickets = getTickets();
  const newTicket: Ticket = {
    ...ticket,
    id: Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
  };
  saveTickets([newTicket, ...tickets]);
  return newTicket;
}

export function updateTicket(id: string, updates: Partial<Ticket>): Ticket | null {
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.id === id);
  if (index === -1) return null;

  const updatedTicket = { ...tickets[index], ...updates };
  const newTickets = [...tickets];
  newTickets[index] = updatedTicket;
  saveTickets(newTickets);
  return updatedTicket;
}

export function deleteTicket(id: string) {
  const tickets = getTickets();
  const filtered = tickets.filter(t => t.id !== id);
  saveTickets(filtered);
}
