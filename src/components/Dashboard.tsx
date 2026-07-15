import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Ticket, School, Clock, Calendar, Phone, Mail, User, ShieldAlert, Sparkles, MessageSquare, Send, Award, Download, Printer } from "lucide-react";
import { Registration } from "../types";
import MascotBit from "./MascotBit";

interface DashboardProps {
  registration: Registration;
  onCancel: () => void;
}

export default function Dashboard({ registration, onCancel }: DashboardProps) {
  const [mentorChatInput, setMentorChatInput] = useState("");
  const [mentorMessages, setMentorMessages] = useState<Array<{ sender: "student" | "mentor"; text: string; time: string }>>([
    {
      sender: "mentor",
      text: `¡Hola, ${registration.studentName}! Soy tu mentor asignado para el taller de ${registration.programName}. Estoy súper emocionado de recibirte pronto. ¿Tienes alguna pregunta sobre los materiales o la fecha de inducción?`,
      time: "Hace 5 minutos",
    },
  ]);
  const [isSending, setIsSending] = useState(false);

  // Mentor generation based on university
  const getMentorName = () => {
    if (registration.universityId === "uees") return "Dra. Gabriela Mendoza (Residente UEES)";
    if (registration.universityId === "ujmd") return "Arq. Rodrigo Escobar (Catedrático/Mentor UJMD)";
    return "Ing. Carlos Rivera (Estudiante de 5° Año UCA)";
  };

  const handleSendMentorMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorChatInput.trim() || isSending) return;

    const newStudentMsg = {
      sender: "student" as const,
      text: mentorChatInput,
      time: "Ahora",
    };

    setMentorMessages((prev) => [...prev, newStudentMsg]);
    setMentorChatInput("");
    setIsSending(true);

    // Simulate mentor reaction after 1.5 seconds
    setTimeout(() => {
      const responses = [
        "¡Qué excelente pregunta! En ese taller utilizaremos batas descartables que nosotros mismos les proveeremos en los laboratorios. No te preocupes por traer nada adicional, solo tu libreta y muchas ganas de aprender.",
        "Perfecto, la fecha de inducción la enviaremos por correo oficial de Futurook este próximo lunes. El transporte de ida y vuelta estará cubierto desde puntos céntricos.",
        "¡Excelente entusiasmo! Te comento que haremos grupos de 5 estudiantes de diferentes institutos. Será genial para que compartan experiencias y hagan nuevos amigos de su misma edad.",
        "Te adelanto que el reto práctico final será evaluado por decanos de la facultad. Habrá premios especiales de Futurook y kits estudiantiles para los mejores proyectos.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMentorMessages((prev) => [
        ...prev,
        {
          sender: "mentor",
          text: randomResponse,
          time: "Hace un momento",
        },
      ]);
      setIsSending(false);
    }, 1500);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in print:p-0">
      {/* Banner de confirmación */}
      <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200 flex flex-col md:flex-row items-center gap-4 text-center md:text-left print:hidden">
        <div className="p-3 bg-green-500 rounded-full text-white">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-black text-xl text-green-800">
            ¡Pre-registro Exitoso, {registration.studentName.split(" ")[0]}! 🎉
          </h3>
          <p className="text-green-700 text-sm mt-1 leading-relaxed">
            Tu cupo para el programa de <strong>{registration.programName}</strong> en la <strong>{registration.universityName}</strong> ha quedado reservado. Guarda tu comprobante.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={triggerPrint}
            className="px-4 py-2 bg-white border border-green-300 text-green-700 font-semibold text-xs rounded-xl hover:bg-green-100 transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Imprimir Comprobante
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COMPROBANTE FISICO ESTILO TICKET (Left side) */}
        <div className="lg:col-span-5 space-y-4 print:col-span-12">
          <h4 className="font-display font-bold text-lg text-futurook-dark flex items-center gap-2 print:hidden">
            <Ticket className="w-5 h-5 text-futurook-purple" /> Tu Pase Universitario Oficial:
          </h4>

          {/* Ticket Body */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-futurook-purple relative max-w-sm mx-auto">
            {/* Header decor */}
            <div className="bg-futurook-purple p-5 text-white text-center relative">
              <span className="font-mono text-[9px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                Futurook - Pase de Taller
              </span>
              <h5 className="font-display font-black text-xl mt-1 tracking-tight">Comprobante Oficial</h5>
              <p className="text-xs text-futurook-purple-light/85 mt-0.5">Identidad del mañana</p>

              {/* Decorative cutout half circles */}
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-futurook-purple-light rounded-full border-2 border-futurook-purple border-t-transparent border-l-transparent" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-futurook-purple-light rounded-full border-2 border-futurook-purple border-t-transparent border-r-transparent" />
            </div>

            {/* Main ticket metadata */}
            <div className="p-6 space-y-5 bg-gradient-to-b from-white to-gray-50 relative">
              {/* Profile card style info */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-gray-100">
                <div className="w-11 h-11 bg-futurook-purple-light rounded-full flex items-center justify-center text-futurook-purple font-bold border border-futurook-purple-medium/30">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="font-extrabold text-sm text-futurook-dark truncate max-w-[220px]">
                    {registration.studentName}
                  </h6>
                  <p className="text-xs text-gray-500 truncate max-w-[220px]">{registration.highSchool}</p>
                </div>
              </div>

              {/* University details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px]">Universidad</span>
                  <div className="font-bold text-futurook-dark flex items-center gap-1.5 mt-0.5">
                    <School className="w-3.5 h-3.5 shrink-0 text-futurook-purple" /> {registration.universityName}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px]">Código de Pase</span>
                  <div className="font-mono font-extrabold text-futurook-purple mt-0.5 text-sm">
                    {registration.voucherCode}
                  </div>
                </div>
              </div>

              {/* Program details */}
              <div className="text-xs border-t border-dashed border-gray-200 pt-4">
                <span className="text-gray-400 font-semibold uppercase text-[10px]">Programa Seleccionado</span>
                <div className="font-bold text-futurook-dark mt-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" /> {registration.programName}
                </div>
              </div>

              {/* Phone, Date */}
              <div className="grid grid-cols-2 gap-4 text-xs border-t border-dashed border-gray-200 pt-4">
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px]">Fecha Registro</span>
                  <div className="font-semibold text-gray-700 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {registration.registrationDate}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold uppercase text-[10px]">Estado Cupo</span>
                  <div className="font-bold text-green-600 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping shrink-0" /> Confirmado
                  </div>
                </div>
              </div>

              {/* Mock Barcode representation */}
              <div className="pt-6 pb-2 border-t border-gray-100 flex flex-col items-center">
                <div className="h-10 w-11/12 bg-mono flex items-center justify-between px-1 bg-gray-100 rounded border border-gray-200">
                  {/* barcode lines */}
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-futurook-dark"
                      style={{
                        width: `${i % 3 === 0 ? "3px" : i % 5 === 0 ? "1px" : "2px"}`,
                        height: "80%",
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-gray-400 mt-1.5">{registration.id}</span>
              </div>
            </div>

            {/* Ticket Footer details */}
            <div className="bg-gray-100/55 border-t border-gray-200 p-4 text-center text-[10px] text-gray-500 leading-relaxed font-medium">
              Válido para un estudiante de bachillerato. Presentar impreso o digital en la entrada del laboratorio el día del evento.
            </div>
          </div>

          <div className="text-center print:hidden">
            <button
              onClick={onCancel}
              className="text-xs text-red-500 font-semibold hover:underline"
            >
              Cancelar pre-registro y volver a iniciar
            </button>
          </div>
        </div>

        {/* MENTOR CHAT (Right side) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-lg p-5 md:p-6 print:hidden">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-futurook-purple-light rounded-xl flex items-center justify-center text-futurook-purple border border-futurook-purple-medium/20 shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-base text-futurook-dark">
                  Canal Directo de Mentoría 💬
                </h4>
                <p className="text-xs text-gray-400">Pregúntale a tu mentor de {registration.universityName}</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 font-mono text-[10px] px-2.5 py-1 rounded-full font-bold uppercase shrink-0">
              ● En Línea
            </span>
          </div>

          {/* Assigned Mentor Card */}
          <div className="bg-futurook-purple-light/40 rounded-2xl p-4 border border-futurook-purple-medium/15 flex items-center gap-3.5 mb-5">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 border border-futurook-purple-medium/30 overflow-hidden">
              <MascotBit expression="happy" size="sm" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-futurook-purple uppercase tracking-wider font-mono">Mentor Asignado</span>
              <h5 className="font-bold text-sm text-futurook-dark">{getMentorName()}</h5>
            </div>
          </div>

          {/* Chat box */}
          <div className="border border-gray-100 rounded-2xl bg-gray-50/50 p-4 h-[240px] overflow-y-auto space-y-4 mb-4">
            {mentorMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === "student"
                      ? "bg-futurook-purple text-white rounded-tr-none"
                      : "bg-white text-futurook-dark border border-gray-100 rounded-tl-none"
                  }`}
                >
                  <p className="font-medium">{msg.text}</p>
                  <span className="text-[9px] block text-right mt-1 opacity-70">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white px-3.5 py-2 rounded-xl text-[11px] text-gray-500 italic border border-gray-100 shadow-sm rounded-tl-none">
                  El mentor está escribiendo...
                </div>
              </div>
            )}
          </div>

          {/* Message input */}
          <form onSubmit={handleSendMentorMessage} className="flex gap-2">
            <input
              type="text"
              value={mentorChatInput}
              onChange={(e) => setMentorChatInput(e.target.value)}
              disabled={isSending}
              placeholder="Hazle una pregunta a tu mentor sobre la carrera..."
              className="flex-1 bg-gray-50 text-futurook-dark text-xs rounded-xl px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-futurook-purple disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!mentorChatInput.trim() || isSending}
              className="bg-futurook-purple text-white px-4 py-3 rounded-xl hover:bg-futurook-purple-dark transition-all shadow-md flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
