import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { School, ArrowRight, ExternalLink, GraduationCap, ChevronDown, ChevronUp, BookOpen, Clock, Globe, PlusCircle, CheckCircle } from "lucide-react";
import { UNIVERSITIES } from "../data";
import { University, Program } from "../types";

interface UniversityExplorerProps {
  onSelectProgram: (universityId: string, programId: string) => void;
  selectedUniversityId?: string;
  selectedProgramId?: string;
}

export default function UniversityExplorer({
  onSelectProgram,
  selectedUniversityId,
  selectedProgramId,
}: UniversityExplorerProps) {
  const [expandedUni, setExpandedUni] = useState<string | null>(UNIVERSITIES[0].id);
  const [expandedProg, setExpandedProg] = useState<string | null>(null);

  const toggleUniversity = (id: string) => {
    setExpandedUni(expandedUni === id ? null : id);
  };

  const toggleProgram = (id: string) => {
    setExpandedProg(expandedProg === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Universities Grid Header */}
      <div className="text-center max-w-xl mx-auto">
        <h3 className="font-display font-extrabold text-2xl md:text-3xl text-futurook-dark">
          Universidades Consorcias actuales 🏫
        </h3>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Conoce a las tres instituciones académicas líderes en El Salvador que aportan su infraestructura de primer nivel para que vivas desafíos profesionales reales.
        </p>
      </div>

      {/* University Cards Accordion */}
      <div className="space-y-4">
        {UNIVERSITIES.map((uni) => {
          const isUniExpanded = expandedUni === uni.id;
          return (
            <div
              key={uni.id}
              className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                isUniExpanded ? "border-futurook-purple shadow-lg" : "border-gray-200 hover:border-futurook-purple-medium shadow-sm"
              }`}
            >
              {/* Header bar click triggers accordion */}
              <div
                onClick={() => toggleUniversity(uni.id)}
                className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none bg-gradient-to-r from-white to-gray-50/40"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-futurook-purple-light rounded-xl text-futurook-purple shrink-0">
                    <School className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-extrabold text-lg md:text-xl text-futurook-dark">
                        {uni.name}
                      </h4>
                      <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-bold">
                        {uni.abbreviation}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm mt-1 leading-relaxed max-w-2xl">
                      {uni.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 shrink-0 self-end md:self-center">
                  <a
                    href={uni.website}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-gray-400 hover:text-futurook-purple rounded-lg hover:bg-gray-100 transition-colors"
                    title="Visitar sitio oficial"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <button className="p-2 bg-futurook-purple-light text-futurook-purple rounded-lg">
                    {isUniExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Accordion Expandable Content */}
              <AnimatePresence initial={false}>
                {isUniExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100 bg-white"
                  >
                    <div className="p-5 md:p-6 space-y-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <BookOpen className="w-4 h-4 text-futurook-purple" /> Programas Disponibles para Taller / Mentoría:
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {uni.programs.map((prog) => {
                          const isProgExpanded = expandedProg === prog.id;
                          const isSelected = selectedProgramId === prog.id;

                          return (
                            <div
                              key={prog.id}
                              className={`border rounded-xl p-4 transition-all duration-300 relative flex flex-col justify-between ${
                                isSelected
                                  ? "border-futurook-purple bg-futurook-purple-light/30 shadow-inner"
                                  : "border-gray-200 hover:border-futurook-purple-medium hover:shadow-sm"
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                                    prog.category === "salud" ? "bg-red-50 text-red-600 border border-red-100" :
                                    prog.category === "ingenieria" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                                    prog.category === "creativo" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                                    prog.category === "negocios" ? "bg-green-50 text-green-600 border border-green-100" :
                                    "bg-amber-50 text-amber-600 border border-amber-100"
                                  }`}>
                                    {prog.category}
                                  </span>
                                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                                    <Clock className="w-3 h-3" /> {prog.duration}
                                  </div>
                                </div>

                                <h5 className="font-display font-bold text-sm text-futurook-dark mb-1">
                                  {prog.name}
                                </h5>
                                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
                                  {prog.description}
                                </p>
                              </div>

                              <div className="space-y-3 mt-2">
                                {/* Extra info button */}
                                <button
                                  onClick={() => toggleProgram(prog.id)}
                                  className="text-[11px] text-futurook-purple hover:text-futurook-purple-dark font-semibold flex items-center gap-1 focus:outline-none"
                                >
                                  {isProgExpanded ? "Ver menos detalles" : "Ver habilidades y laboratorios"}
                                </button>

                                {/* Expanding program specific details */}
                                <AnimatePresence>
                                  {isProgExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="space-y-3 pt-2 border-t border-dashed border-gray-200 text-left"
                                    >
                                      <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Aprenderás:</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {prog.skillsLearned.map((sk, idx) => (
                                            <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                              {sk}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Equipamiento/Prácticas:</p>
                                        <ul className="list-disc pl-3 text-[10px] text-gray-500 space-y-0.5 mt-1">
                                          {prog.fieldHighlights.map((fh, idx) => (
                                            <li key={idx}>{fh}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                <button
                                  onClick={() => onSelectProgram(uni.id, prog.id)}
                                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                                    isSelected
                                      ? "bg-green-600 text-white shadow-sm"
                                      : "bg-futurook-purple hover:bg-futurook-purple-dark text-white shadow-sm"
                                  }`}
                                >
                                  {isSelected ? (
                                    <>
                                      <CheckCircle className="w-3.5 h-3.5" /> Carrera Seleccionada
                                    </>
                                  ) : (
                                    <>
                                      Seleccionar Carrera <ArrowRight className="w-3.5 h-3.5" />
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* PROXIMAMENTE MAS UNIVERSIDADES ASOCIADAS */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden rounded-2xl border-2 border-dashed border-futurook-purple-medium/40 bg-gradient-to-r from-futurook-purple-light/20 via-white to-futurook-purple-light/10 p-6 md:p-8 text-center"
      >
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
          <PlusCircle className="w-40 h-40 text-futurook-purple" />
        </div>
        
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-futurook-purple-light text-futurook-purple text-xs font-mono font-black uppercase rounded-full mb-3">
          🔮 Identidad del Mañana
        </span>
        
        <h4 className="font-display font-extrabold text-lg md:text-xl text-futurook-dark">
          ¡Próximamente más universidades asociadas!
        </h4>
        
        <p className="text-gray-500 text-xs md:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          Nuestra red está creciendo activamente. Estamos estableciendo alianzas de impacto con más universidades nacionales e internacionales para expandir nuestra oferta de orientación vocacional sin costo. ¡Mantente atento(a) a las nuevas incorporaciones!
        </p>
      </motion.div>
    </div>
  );
}
