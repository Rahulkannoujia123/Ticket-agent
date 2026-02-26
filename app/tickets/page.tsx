"use client";

import { useState, useEffect } from "react";
import { Ticket } from "@/lib/types";
import { getTickets, addTicket, updateTicket, deleteTicket } from "@/lib/storage";
import TicketForm from "@/components/TicketForm";
import TicketList from "@/components/TicketList";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTickets(getTickets());
    setMounted(true);
  }, []);

  const refreshTickets = () => {
    setTickets(getTickets());
  };

  const handleAddTicket = (data: Omit<Ticket, 'id' | 'createdAt'>) => {
    addTicket(data);
    setShowForm(false);
    refreshTickets();
  };

  const handleUpdateTicket = (data: Omit<Ticket, 'id' | 'createdAt'>) => {
    if (editingTicket) {
      updateTicket(editingTicket.id, data);
      setEditingTicket(undefined);
      refreshTickets();
    }
  };

  const handleDeleteTicket = (id: string) => {
    deleteTicket(id);
    refreshTickets();
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mb-2 transition-colors">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Yatri Details <span className="text-blue-600">(Tickets)</span>
          </h2>
          <p className="text-gray-500 font-medium">Manage and track all customer travel details</p>
        </div>
        {!showForm && !editingTicket && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-200 active:scale-95"
          >
            <Plus size={20} /> Add New Ticket
          </button>
        )}
      </div>

      {(showForm || editingTicket) && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <TicketForm
            initialData={editingTicket}
            onSubmit={editingTicket ? handleUpdateTicket : handleAddTicket}
            onCancel={() => {
              setShowForm(false);
              setEditingTicket(undefined);
            }}
          />
        </div>
      )}

      {!showForm && !editingTicket && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <TicketList
            tickets={tickets}
            onEdit={(t) => {
              setEditingTicket(t);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDelete={handleDeleteTicket}
          />
        </div>
      )}
    </div>
  );
}
