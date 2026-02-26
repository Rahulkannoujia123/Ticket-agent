"use client";

import { useState } from "react";
import { Ticket, TicketStatus } from "@/lib/types";
import { X } from "lucide-react";

interface TicketFormProps {
  initialData?: Ticket;
  onSubmit: (data: Omit<Ticket, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function TicketForm({ initialData, onSubmit, onCancel }: TicketFormProps) {
  const [formData, setFormData] = useState<Omit<Ticket, 'id' | 'createdAt'>>({
    customerName: initialData?.customerName || "",
    mobileNumber: initialData?.mobileNumber || "",
    from: initialData?.from || "",
    to: initialData?.to || "",
    travelDate: initialData?.travelDate || "",
    mode: initialData?.mode || "Train",
    passengers: initialData?.passengers || 1,
    idProof: initialData?.idProof || "",
    status: initialData?.status || "Pending",
    notes: initialData?.notes || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'passengers' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl mx-auto animate-in fade-in zoom-in duration-200">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h3 className="text-xl font-bold text-gray-800">
          {initialData ? "Edit Ticket (Badlav Karein)" : "Add New Ticket (Naya Ticket)"}
        </h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="customerName" className="text-sm font-medium text-gray-700">Customer Name *</label>
            <input
              id="customerName"
              required
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              placeholder="e.g. Rahul Kumar"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="mobileNumber" className="text-sm font-medium text-gray-700">Mobile Number *</label>
            <input
              id="mobileNumber"
              required
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              placeholder="e.g. 9876543210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="from" className="text-sm font-medium text-gray-700">Kahaan Se (From) *</label>
            <input
              id="from"
              required
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              placeholder="Delhi"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="to" className="text-sm font-medium text-gray-700">Kahaan Tak (To) *</label>
            <input
              id="to"
              required
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              placeholder="Patna"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="travelDate" className="text-sm font-medium text-gray-700">Travel Date *</label>
            <input
              id="travelDate"
              required
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="mode" className="text-sm font-medium text-gray-700">Mode *</label>
            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            >
              <option value="Train">Train 🚂</option>
              <option value="Bus">Bus 🚌</option>
              <option value="Flight">Flight ✈️</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="passengers" className="text-sm font-medium text-gray-700">Passengers *</label>
            <input
              id="passengers"
              required
              type="number"
              min="1"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="idProof" className="text-sm font-medium text-gray-700">ID Proof Detail (Optional)</label>
          <input
            id="idProof"
            name="idProof"
            value={formData.idProof}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            placeholder="Aadhar Number / Voter ID"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Ticket Status *</label>
          <div className="flex flex-wrap gap-4 mt-1 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-200">
            {(['Pending', 'Booked', 'Cancelled'] as TicketStatus[]).map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={formData.status === s}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className={`text-sm ${
                  s === 'Booked' ? 'text-green-600' : s === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'
                } font-bold group-hover:underline`}>{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Notes (Instructions)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            placeholder="e.g. Window seat, Lower berth"
          ></textarea>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md active:scale-[0.98]"
          >
            {initialData ? "Update Karein" : "Save Ticket"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
