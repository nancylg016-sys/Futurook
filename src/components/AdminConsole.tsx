import React, { useState } from "react";
import { ClipboardCheck, Search, Trash2, CheckCircle, RefreshCw, BarChart3, TrendingUp, Users, Percent } from "lucide-react";
import { Registration } from "../types";

interface AdminConsoleProps {
  registrations: Registration[];
  onUpdateStatus: (id: string, newStatus: "Pendiente" | "Confirmado" | "En Curso") => void;
  onDeleteRegistration: (id: string) => void;
  onClearAll: () => void;
}

export default function AdminConsole({
  registrations,
  onUpdateStatus,
  onDeleteRegistration,
  onClearAll,
}: AdminConsoleProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.highSchool.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.voucherCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistics calculation
  const totalRegistrations = registrations.length;
  
  const universityCounts = registrations.reduce((acc, reg) => {
    acc[reg.universityName] = (acc[reg.universityName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryCounts = registrations.reduce((acc, reg) => {
    const category = reg.answersSummary?.preferredArea || "General / Manual";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularUniversity = Object.entries(universityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Ninguna aún";
  const mostPopularProfile = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Ninguno aún";

  return (
    <div className="space-y-6">
      {/* Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Registrados Totales</span>
            <span className="text-3xl font-display font-black text-futurook-dark mt-1 block">
              {totalRegistrations}
            </span>
          </div>
          <div className="p-3 bg-futurook-purple-light rounded-xl text-futurook-purple">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Universidad Líder</span>
            <span className="text-base font-display font-extrabold text-futurook-dark mt-1 block truncate max-w-[140px]">
              {mostPopularUniversity}
            </span>
          </div>
          <div className="p-3 bg-green-50 rounded-xl text-green-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Perfil Vocacional Top</span>
            <span className="text-base font-display font-extrabold text-futurook-dark mt-1 block truncate max-w-[140px]">
              {mostPopularProfile}
            </span>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Soporte Escolar</span>
            <span className="text-sm font-display font-bold text-futurook-dark mt-1 block">
              Red El Salvador
            </span>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Percent className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Table Panel */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-display font-extrabold text-xl text-futurook-dark">
              Listado de Alumnos Pre-registrados 📄
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Control administrativo local en tiempo de ejecución.</p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por alumno, colegio o pase..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 text-futurook-dark text-xs rounded-xl pl-9 pr-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-futurook-purple"
              />
            </div>
            {registrations.length > 0 && (
              <button
                onClick={onClearAll}
                className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-xl border border-red-200 transition-colors"
              >
                Limpiar todo
              </button>
            )}
          </div>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <ClipboardCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium">No se encontraron pre-registros.</p>
            <p className="text-xs text-gray-400 mt-1">Registra un alumno desde el formulario para verlo reflejado aquí.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Estudiante / Edad</th>
                  <th className="px-6 py-4">Colegio Procedencia</th>
                  <th className="px-6 py-4">Universidad / Carrera</th>
                  <th className="px-6 py-4">Voucher</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-futurook-dark">
                      <div>{reg.studentName}</div>
                      <div className="text-[10px] text-gray-400 font-normal">Edad: {reg.studentAge} años | {reg.studentPhone}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium max-w-[180px] truncate">
                      {reg.highSchool}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="inline-block text-[9px] bg-futurook-purple-light text-futurook-purple px-1.5 py-0.5 rounded font-bold font-mono">
                          {reg.universityName}
                        </span>
                      </div>
                      <div className="font-semibold text-gray-600 mt-0.5">{reg.programName}</div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-futurook-purple-dark">
                      {reg.voucherCode}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{reg.registrationDate}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2 items-center">
                      <select
                        value={reg.status}
                        onChange={(e) =>
                          onUpdateStatus(reg.id, e.target.value as "Pendiente" | "Confirmado" | "En Curso")
                        }
                        className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-[10px] font-semibold text-gray-600 focus:outline-none focus:ring-1 focus:ring-futurook-purple"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="En Curso">En Curso</option>
                      </select>

                      <button
                        onClick={() => onDeleteRegistration(reg.id)}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded transition-colors"
                        title="Eliminar pre-registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
