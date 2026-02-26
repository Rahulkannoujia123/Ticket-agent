"use client";

import { useEffect, useState } from "react";
import { getTickets } from "@/lib/storage";
import { Ticket } from "@/lib/types";
import { isToday, isTomorrow, parseISO } from "date-fns";
import { AlertCircle, Calendar, CheckCircle, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTickets(getTickets());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const todayTickets = tickets.filter(t => t.travelDate && isToday(parseISO(t.travelDate)));
  const tomorrowTickets = tickets.filter(t => t.travelDate && isTomorrow(parseISO(t.travelDate)));

  const pendingToday = todayTickets.filter(t => t.status === 'Pending');
  const bookedTickets = tickets.filter(t => t.status === 'Booked');
  const pendingTickets = tickets.filter(t => t.status === 'Pending');
  const cancelledTickets = tickets.filter(t => t.status === 'Cancelled');

  const bookedPercent = tickets.length > 0 ? (bookedTickets.length / tickets.length) * 100 : 0;
  const pendingPercent = tickets.length > 0 ? (pendingTickets.length / tickets.length) * 100 : 0;
  const cancelledPercent = tickets.length > 0 ? (cancelledTickets.length / tickets.length) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500">Welcome back, Agent Sahab!</p>
        </div>
        <Link
          href="/tickets"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          Naya Ticket Add Karein <ArrowRight size={18} />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Aaj ke Pending</p>
              <p className="text-2xl font-bold text-gray-800">{pendingToday.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Kal ke Tickets</p>
              <p className="text-2xl font-bold text-gray-800">{tomorrowTickets.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Booked Ho Gaye</p>
              <p className="text-2xl font-bold text-gray-800">{bookedTickets.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Customers</p>
              <p className="text-2xl font-bold text-gray-800">{tickets.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reminders Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800">
              <AlertCircle className="text-orange-500" size={20} />
              Reminders (Yaad Dilana)
            </h3>
            <div className="space-y-3">
              {pendingToday.length > 0 ? pendingToday.map(t => (
                <div key={t.id} className="p-4 bg-yellow-50 text-yellow-900 rounded-lg border border-yellow-100 flex justify-between items-center group hover:bg-yellow-100 transition-colors">
                  <div>
                    <span className="font-bold">Aaj</span> {t.customerName} ka ticket nikalna hai
                    <div className="text-xs text-yellow-700 mt-1">{t.mode}: {t.from} से {t.to}</div>
                  </div>
                  <Link href="/tickets" className="text-xs bg-yellow-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">View</Link>
                </div>
              )) : (
                <p className="text-gray-400 text-sm italic py-2">Aaj koi pending ticket nahi hai.</p>
              )}

              {tomorrowTickets.filter(t => t.status === 'Pending').map(t => (
                <div key={t.id} className="p-4 bg-blue-50 text-blue-900 rounded-lg border border-blue-100 flex justify-between items-center group hover:bg-blue-100 transition-colors">
                  <div>
                    <span className="font-bold">Kal</span> {t.customerName} ka {t.mode} ticket pending hai
                    <div className="text-xs text-blue-700 mt-1">{t.from} to {t.to}</div>
                  </div>
                  <Link href="/tickets" className="text-xs bg-blue-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">View</Link>
                </div>
              ))}

              {pendingToday.length === 0 && tomorrowTickets.filter(t => t.status === 'Pending').length === 0 && tickets.length > 0 && (
                <p className="text-green-600 text-sm font-medium">Sab kaam up-to-date hai! 👍</p>
              )}

              {tickets.length === 0 && (
                <p className="text-gray-500 text-sm">Abhi tak koi data nahi hai. Naya ticket add karein!</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Booking Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Booked</span>
                  <span className="font-semibold text-green-600">{bookedTickets.length}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: `${bookedPercent}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-yellow-600">{pendingTickets.length}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${pendingPercent}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Cancelled</span>
                  <span className="font-semibold text-red-600">{cancelledTickets.length}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: `${cancelledPercent}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 text-center">
              <p className="text-xs text-gray-400">Total volume: {tickets.length} customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
