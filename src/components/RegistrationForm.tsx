import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, ClipboardCheck, Sparkles, HelpCircle, ArrowRight, BookOpen, AlertTriangle } from "lucide-react";
import { UNIVERSITIES } from "../data";
import { Registration } from "../types";
import MascotBit from "./MascotBit";

interface RegistrationFormProps {
  preselectedUniversityId?: string;
  preselectedProgramId?: string;
  preselectedArea?: string;
  onSuccess: (newRegistration: Registration) => void;
}

export default function RegistrationForm({
  preselectedUniversityId = "",
  preselectedProgramId = "",
  preselectedArea = "",
  onSuccess,
}: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentAge: "",
    studentPhone: "",
    highSchool: "",
    universityId: preselectedUniversityId,
    programId: preselectedProgramId,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bitBubble, setBitBubble] = useState("¡Casi listo! Completa tu información para apartar tu cupo en el taller.");

  // Sync pre-selected choices from other views
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      universityId: preselectedUniversityId,
      programId: preselectedProgramId,
    }));
  }, [preselectedUniversityId, preselectedProgramId]);

  const selectedUniversity = UNIVERSITIES.find((u) => u.id === formData.universityId);
  const availablePrograms = selectedUniversity ? selectedUniversity.programs : [];

  // Bit mascot hints dynamically changing based on which field has focus
  const handleFocus = (fieldName: string) => {
    switch (fieldName) {
      case "studentName":
        setBitBubble("¡Escribe tu nombre completo tal como te gusta que te llamen!");
        break;
      case "studentEmail":
        setBitBubble("Necesitamos tu correo electrónico para enviarte los detalles del taller y la mentoría.");
        break;
      case "studentAge":
        setBitBubble("Recuerda que Futurook está dirigido principalmente a jóvenes de 15 a 17 años de bachillerato.");
        break;
      case "studentPhone":
        setBitBubble("Tu número de WhatsApp nos servirá para que tu mentor universitario te contacte directamente.");
        break;
      case "highSchool":
        setBitBubble("¿En qué instituto o colegio de El Salvador estudias? ¡Me encanta conocer escuelas!");
        break;
      case "universityId":
        setBitBubble("Selecciona la universidad donde te gustaría vivir la experiencia del reto práctico.");
        break;
      case "programId":
        setBitBubble("Elige el programa académico que más llamó tu atención.");
        break;
      default:
        setBitBubble("¡Casi listo! Completa tu información para apartar tu cupo en el taller.");
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.studentName.trim()) tempErrors.studentName = "El nombre completo es requerido.";
    
    if (!formData.studentEmail.trim()) {
      tempErrors.studentEmail = "El correo electrónico es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(formData.studentEmail)) {
      tempErrors.studentEmail = "El correo no tiene un formato válido.";
    }

    const ageNum = parseInt(formData.studentAge, 10);
    if (!formData.studentAge) {
      tempErrors.studentAge = "La edad es requerida.";
    } else if (isNaN(ageNum) || ageNum < 12 || ageNum > 25) {
      tempErrors.studentAge = "Ingresa una edad válida (12 a 25 años).";
    }

    if (!formData.studentPhone.trim()) {
      tempErrors.studentPhone = "El teléfono de contacto es requerido.";
    } else if (formData.studentPhone.replace(/\D/g, "").length < 8) {
      tempErrors.studentPhone = "El teléfono debe tener al menos 8 dígitos.";
    }

    if (!formData.highSchool.trim()) tempErrors.highSchool = "Especifica tu colegio o instituto.";
    if (!formData.universityId) tempErrors.universityId = "Selecciona una universidad.";
    if (!formData.programId) tempErrors.programId = "Selecciona la carrera o programa.";

    setErrors(tempErrors);
    
    if (Object.keys(tempErrors).length > 0) {
      setBitBubble("¡Ups! Revisa las alertas en rojo. ¡Te ayudo a resolverlas!");
    }

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const chosenUniversity = UNIVERSITIES.find((u) => u.id === formData.universityId)!;
    const chosenProgram = chosenUniversity.programs.find((p) => p.id === formData.programId)!;
    
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const voucherCode = `FT-${chosenUniversity.abbreviation}-${randomSuffix}`;

    const newRegistration: Registration = {
      id: String(Date.now()),
      studentName: formData.studentName,
      studentEmail: formData.studentEmail,
      studentAge: parseInt(formData.studentAge, 10),
      studentPhone: formData.studentPhone,
      highSchool: formData.highSchool,
      universityId: formData.universityId,
      universityName: chosenUniversity.name,
      programId: formData.programId,
      programName: chosenProgram.name,
      registrationDate: new Date().toLocaleDateString("es-SV", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Pendiente",
      voucherCode,
      answersSummary: preselectedArea ? {
        preferredArea: preselectedArea,
        bitRecommendation: chosenProgram.name
      } : undefined
    };

    onSuccess(newRegistration);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-futurook-purple-medium/30">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mascot & Guide Column */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 lg:sticky lg:top-8 bg-futurook-purple-light/30 rounded-2xl border border-futurook-purple-medium/15">
          <MascotBit expression="talking" size="md" showBubble={true} bubbleText={bitBubble} />
          
          <div className="mt-8 text-left space-y-4 text-xs text-gray-500 max-w-xs">
            <h5 className="font-bold text-futurook-dark uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-futurook-purple" /> ¿Por qué registrarse?
            </h5>
            <p className="leading-relaxed">
              Al completar este formulario, aseguras tu participación sin costo en el próximo reto vocacional práctico de la universidad elegida.
            </p>
            <div className="flex gap-2 items-center text-futurook-purple-dark font-medium">
              <Check className="w-4 h-4 shrink-0 text-green-600" /> Talleres prácticos presenciales
            </div>
            <div className="flex gap-2 items-center text-futurook-purple-dark font-medium">
              <Check className="w-4 h-4 shrink-0 text-green-600" /> Mentoría de alumnos avanzados
            </div>
            <div className="flex gap-2 items-center text-futurook-purple-dark font-medium">
              <Check className="w-4 h-4 shrink-0 text-green-600" /> Certificado de participación
            </div>
          </div>
        </div>

        {/* Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-display font-extrabold text-2xl text-futurook-dark">
              Formulario de Pre-registro 📝
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Asegura tu participación completando tus datos generales. Es 100% libre de costo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Student Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                Nombre Completo del Estudiante
              </label>
              <input
                type="text"
                placeholder="Ej. Sofía Alejandra Pérez"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                onFocus={() => handleFocus("studentName")}
                className={`w-full bg-gray-50 text-futurook-dark text-sm rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-futurook-purple transition-all ${
                  errors.studentName ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.studentName && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.studentName}
                </p>
              )}
            </div>

            {/* Student Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={formData.studentEmail}
                onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                onFocus={() => handleFocus("studentEmail")}
                className={`w-full bg-gray-50 text-futurook-dark text-sm rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-futurook-purple transition-all ${
                  errors.studentEmail ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.studentEmail && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.studentEmail}
                </p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                Edad (Años)
              </label>
              <input
                type="number"
                placeholder="Ej. 16"
                min="12"
                max="25"
                value={formData.studentAge}
                onChange={(e) => setFormData({ ...formData, studentAge: e.target.value })}
                onFocus={() => handleFocus("studentAge")}
                className={`w-full bg-gray-50 text-futurook-dark text-sm rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-futurook-purple transition-all ${
                  errors.studentAge ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.studentAge && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.studentAge}
                </p>
              )}
              {/* Age Target Warning */}
              {formData.studentAge && (parseInt(formData.studentAge) < 15 || parseInt(formData.studentAge) > 17) && (
                <p className="text-[11px] text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg mt-1 font-medium flex items-center gap-1.5 border border-amber-100">
                  ⚠️ Edad fuera de la meta (15-17 años), pero eres bienvenido a participar.
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                Teléfono de Contacto (WhatsApp)
              </label>
              <input
                type="tel"
                placeholder="Ej. 7777-1234"
                value={formData.studentPhone}
                onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                onFocus={() => handleFocus("studentPhone")}
                className={`w-full bg-gray-50 text-futurook-dark text-sm rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-futurook-purple transition-all ${
                  errors.studentPhone ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.studentPhone && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.studentPhone}
                </p>
              )}
            </div>

            {/* High School */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                Instituto, Colegio de Procedencia o Escuela
              </label>
              <input
                type="text"
                placeholder="Ej. Instituto Nacional General Francisco Menéndez (INFRAMEN)"
                value={formData.highSchool}
                onChange={(e) => setFormData({ ...formData, highSchool: e.target.value })}
                onFocus={() => handleFocus("highSchool")}
                className={`w-full bg-gray-50 text-futurook-dark text-sm rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-futurook-purple transition-all ${
                  errors.highSchool ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.highSchool && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.highSchool}
                </p>
              )}
            </div>

            {/* University Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                Universidad de Preferencia
              </label>
              <select
                value={formData.universityId}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    universityId: e.target.value,
                    programId: "", // Reset program when uni changes
                  });
                }}
                onFocus={() => handleFocus("universityId")}
                className={`w-full bg-gray-50 text-futurook-dark text-sm rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-futurook-purple transition-all ${
                  errors.universityId ? "border-red-400" : "border-gray-200"
                }`}
              >
                <option value="">-- Selecciona Universidad --</option>
                {UNIVERSITIES.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name} ({uni.abbreviation})
                  </option>
                ))}
              </select>
              {errors.universityId && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.universityId}
                </p>
              )}
            </div>

            {/* Program Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                Carrera o Programa de Interés
              </label>
              <select
                value={formData.programId}
                onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                onFocus={() => handleFocus("programId")}
                disabled={!formData.universityId}
                className={`w-full bg-gray-50 text-futurook-dark text-sm rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-futurook-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.programId ? "border-red-400" : "border-gray-200"
                }`}
              >
                <option value="">-- Selecciona Carrera --</option>
                {availablePrograms.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name}
                  </option>
                ))}
              </select>
              {!formData.universityId && (
                <p className="text-[10px] text-gray-400 italic">Debes elegir una universidad primero.</p>
              )}
              {errors.programId && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errors.programId}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-futurook-purple hover:bg-futurook-purple-dark text-white font-display font-bold px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Completar Registro <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
