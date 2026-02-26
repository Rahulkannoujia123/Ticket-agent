"use client";

import { Ticket } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { Search, Filter, Edit2, Trash2, MessageSquare, Train, Bus, Plane, Calendar, Phone, MapPin, User } from "lucide-react";
import { useState } from "react";
import { formatWhatsAppLink } from "@/lib/utils";

interface TicketListProps {
  tickets: Ticket[];
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

export default function TicketList({ tickets, onEdit, onDelete }: TicketListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredTickets = tickets.filter(t => {
    const matchesSearch =
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.mobileNumber.includes(searchTerm);
    const matchesDate = dateFilter ? t.travelDate === dateFilter : true;
    return matchesSearch && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Booked': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Flight': return <Plane size={16} />;
      case 'Bus': return <Bus size={16} />;
      default: return <Train size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Naam ya Mobile se search karein..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Tickets Display */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Route & Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {ticket.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{ticket.customerName}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone size={12} /> {ticket.mobileNumber}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{ticket.from}</span>
                    <span className="text-gray-300">→</span>
                    <span>{ticket.to}</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Calendar size={14} /> {format(parseISO(ticket.travelDate), 'dd MMM yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="bg-gray-100 p-1.5 rounded text-blue-600 font-bold">{getModeIcon(ticket.mode)}</span>
                    <span className="font-medium">{ticket.mode} • {ticket.passengers} pax</span>
                  </div>
                  {ticket.idProof && (
                    <div className="text-xs text-gray-400 mt-1">ID: {ticket.idProof}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <a
                      href={formatWhatsAppLink(ticket.mobileNumber, `Namaste ${ticket.customerName}, aapka ${ticket.from} se ${ticket.to} ka ${ticket.mode} ticket ${ticket.status} hai.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="WhatsApp Reminder"
                    >
                      <MessageSquare size={18} />
                    </a>
                    <button
                      onClick={() => onEdit(ticket)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if(confirm('Delete karna chahte hain?')) onDelete(ticket.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {ticket.customerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{ticket.customerName}</div>
                  <div className="text-sm text-gray-500">{ticket.mobileNumber}</div>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50 text-sm">
              <div>
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Route</p>
                <p className="font-bold text-gray-700">{ticket.from} → {ticket.to}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Date</p>
                <p className="font-bold text-gray-700">{format(parseISO(ticket.travelDate), 'dd MMM yyyy')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Mode</p>
                <p className="font-bold text-gray-700 flex items-center gap-1">
                  {getModeIcon(ticket.mode)} {ticket.mode}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Passengers</p>
                <p className="font-bold text-gray-700">{ticket.passengers} pax</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
               {ticket.notes && <p className="text-xs text-gray-500 italic">"{ticket.notes}"</p>}
               <div className="flex gap-2 ml-auto">
                  <a
                    href={formatWhatsAppLink(ticket.mobileNumber, `Namaste ${ticket.customerName}, aapka ticket ${ticket.status} hai.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-green-50 text-green-600 rounded-lg"
                  >
                    <MessageSquare size={18} />
                  </a>
                  <button onClick={() => onEdit(ticket)} className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => onDelete(ticket.id)} className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <Trash2 size={18} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-gray-300">
          <div className="text-gray-400 mb-2 font-medium">Koi ticket nahi mila!</div>
          <p className="text-sm text-gray-500 italic">Naya search try karein ya ticket add karein.</p>
        </div>
      )}
    </div>
  );
}
