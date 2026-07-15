import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, GraduationCap, ArrowUpRight } from "lucide-react";
import { VOCATIONAL_QUIZ, UNIVERSITIES } from "../data";
import MascotBit from "./MascotBit";

interface VocationalQuizProps {
  onSelectProgram: (universityId: string, programId: string, area: string) => void;
}

export default function VocationalQuiz({ onSelectProgram }: VocationalQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizStarted(true);
    setQuizFinished(false);
  };

  const handleOptionSelect = (score: string) => {
    const updatedAnswers = [...answers, score];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < VOCATIONAL_QUIZ.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const updatedAnswers = [...answers];
      updatedAnswers.pop();
      setAnswers(updatedAnswers);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate top category
  const getResults = () => {
    const counts: Record<string, number> = {
      salud: 0,
      ingenieria: 0,
      social: 0,
      creativo: 0,
      negocios: 0,
    };

    answers.forEach((ans) => {
      if (counts[ans] !== undefined) {
        counts[ans]++;
      }
    });

    let topCategory = "salud";
    let maxCount = -1;

    Object.entries(counts).forEach(([category, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = category;
      }
    });

    const categoriesInfo: Record<
      string,
      {
        title: string;
        description: string;
        strengths: string[];
        matchedPrograms: { universityId: string; programId: string; name: string; universityName: string }[];
      }
    > = {
      salud: {
        title: "Ciencias de la Salud y Cuidado Humano",
        description: "Tienes una tremenda vocación de servicio, empatía y curiosidad por el cuerpo humano. Te motiva el bienestar físico de las personas, el diagnóstico y salvar vidas.",
        strengths: ["Empatía activa", "Atención al detalle", "Rigor científico", "Trabajo bajo presión"],
        matchedPrograms: [
          { universityId: "uees", programId: "uees-medicina", name: "Doctorado en Medicina", universityName: "UEES" },
          { universityId: "uees", programId: "uees-odontologia", name: "Doctorado en Cirugía Dental", universityName: "UEES" },
        ],
      },
      ingenieria: {
        title: "Tecnología, Ingeniería e Innovación Técnica",
        description: "Te fascina resolver problemas lógicos complejos, la tecnología, entender cómo funcionan los sistemas y construir soluciones para automatizar procesos.",
        strengths: ["Pensamiento lógico-matemático", "Desarrollo de software", "Análisis estructurado", "Innovación"],
        matchedPrograms: [
          { universityId: "uca", programId: "uca-computacion", name: "Ingeniería Informática", universityName: "UCA" },
          { universityId: "uca", programId: "uca-industrial", name: "Ingeniería Industrial", universityName: "UCA" },
        ],
      },
      social: {
        title: "Ciencias Sociales y Comunicación Humana",
        description: "Te interesan las personas, la resolución de conflictos, debatir, escribir, entender el comportamiento psicológico o coordinar el impacto social en tu país.",
        strengths: ["Habilidades de comunicación", "Empatía", "Comprensión lectora", "Justicia social"],
        matchedPrograms: [
          { universityId: "uees", programId: "uees-psicologia", name: "Licenciatura en Psicología", universityName: "UEES" },
          { universityId: "ujmd", programId: "ujmd-comunicaciones", name: "Licenciatura en Ciencias de la Comunicación", universityName: "UJMD" },
        ],
      },
      creativo: {
        title: "Creatividad, Diseño y Espacios Expresivos",
        description: "Eres una persona visual y artística. Te apasiona crear marcas, moldear espacios habitables, tomar fotografías, ilustrar o componer ideas que transmitan emociones.",
        strengths: ["Pensamiento lateral", "Apreciación estética", "Edición visual", "Dirección de arte"],
        matchedPrograms: [
          { universityId: "ujmd", programId: "ujmd-diseno", name: "Licenciatura en Diseño Gráfico", universityName: "UJMD" },
          { universityId: "ujmd", programId: "ujmd-arquitectura", name: "Arquitectura", universityName: "UJMD" },
        ],
      },
      negocios: {
        title: "Estrategia, Negocios y Emprendimiento",
        description: "Te encanta coordinar personas, planificar recursos, idear modelos comerciales innovadores y liderar equipos hacia metas financieras y sociales viables.",
        strengths: ["Liderazgo estratégico", "Gestión financiera", "Negociación", "Organización"],
        matchedPrograms: [
          { universityId: "uca", programId: "uca-administracion", name: "Licenciatura en Administración de Empresas", universityName: "UCA" },
        ],
      },
    };

    return {
      category: topCategory,
      info: categoriesInfo[topCategory] || categoriesInfo["salud"],
    };
  };

  const currentQuestion = VOCATIONAL_QUIZ[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / VOCATIONAL_QUIZ.length) * 100;

  // Get Bit's interactive bubbles during quiz
  const getBitQuizBubble = () => {
    if (currentQuestionIndex === 0) return "¡Hola! Responderé contigo. ¡Elige con honestidad!";
    if (currentQuestionIndex === 1) return "¡Vaya, eso suena fascinante! Continuemos.";
    if (currentQuestionIndex === 2) return "¡Ya vamos a la mitad! Mis páginas de datos se llenan.";
    if (currentQuestionIndex === 3) return "¡La última! Presiento una gran carrera para ti.";
    return "¡Vas excelente!";
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-futurook-purple-medium/30">
      {!quizStarted ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-6">
            <MascotBit expression="happy" size="lg" showBubble={true} bubbleText="¡Hola! ¿Descubrimos juntos tu futuro académico?" />
          </div>

          <h2 className="font-display font-bold text-3xl text-futurook-dark mb-4">
            Test Vocacional de Futurook 🎯
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Responde 4 preguntas sencillas de opción múltiple diseñadas por <strong>Bit</strong> para descubrir qué área profesional conecta con tus verdaderas pasiones e intereses, y recibe sugerencias personalizadas de programas en nuestras universidades consorcias.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleStartQuiz}
              className="bg-futurook-purple hover:bg-futurook-purple-dark text-white font-display font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Iniciar Test con Bit <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-8 text-xs text-gray-400 font-mono">
            <span>⏱️ Solo toma 2 minutos</span>
            <span>✨ Recomendación Directa</span>
            <span>🎓 3 Universidades Salvador</span>
          </div>
        </div>
      ) : !quizFinished ? (
        <div>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono mb-2">
              <span>Pregunta {currentQuestionIndex + 1} de {VOCATIONAL_QUIZ.length}</span>
              <span>{Math.round(progressPercent)}% Completado</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <motion.div
                className="bg-futurook-purple h-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Mascot on the left */}
            <div className="lg:col-span-4 flex justify-center">
              <MascotBit
                expression={currentQuestionIndex % 2 === 0 ? "talking" : "happy"}
                size="md"
                showBubble={true}
                bubbleText={getBitQuizBubble()}
              />
            </div>

            {/* Question Card on the right */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="bg-futurook-purple-light/40 p-6 rounded-2xl border border-futurook-purple-medium/20"
                >
                  <h3 className="font-display font-bold text-xl md:text-2xl text-futurook-dark mb-6 leading-snug">
                    {currentQuestion.question}
                  </h3>

                  <div className="space-y-3.5">
                    {currentQuestion.options.map((opt, i) => (
                      <motion.button
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        key={i}
                        onClick={() => handleOptionSelect(opt.score)}
                        className="w-full text-left bg-white hover:bg-futurook-purple hover:text-white p-4 rounded-xl border border-gray-200 hover:border-futurook-purple transition-all shadow-sm flex gap-3 text-sm font-medium leading-relaxed"
                      >
                        <span className="font-mono bg-futurook-purple-light text-futurook-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white/20 text-xs">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Results Screen
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <MascotBit expression="happy" size="lg" showBubble={true} bubbleText="¡GUAU! ¡Mis páginas de cálculo están listas!" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 font-mono text-xs px-3.5 py-1.5 rounded-full mb-4">
            <CheckCircle2 className="w-4 h-4" /> ¡Análisis de Bit completado!
          </div>

          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-futurook-dark mb-2">
            Tu perfil principal es:
          </h2>
          <h3 className="font-display font-black text-3xl md:text-4xl text-futurook-purple mb-6">
            {getResults().info.title} ✨
          </h3>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed text-base">
            {getResults().info.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left max-w-4xl mx-auto mb-10">
            {/* Strengths */}
            <div className="md:col-span-5 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="font-display font-bold text-lg text-futurook-dark mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-futurook-purple" /> Tus fortalezas clave:
              </h4>
              <ul className="space-y-3">
                {getResults().info.strengths.map((str, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                    <span className="w-2 h-2 bg-futurook-purple rounded-full" /> {str}
                  </li>
                ))}
              </ul>
            </div>

            {/* Matched Programs */}
            <div className="md:col-span-7 bg-futurook-purple-light/20 p-6 rounded-2xl border border-futurook-purple-medium/30">
              <h4 className="font-display font-bold text-lg text-futurook-dark mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-futurook-purple" /> Carreras recomendadas para ti:
              </h4>
              
              <div className="space-y-3">
                {getResults().info.matchedPrograms.map((prog) => (
                  <div
                    key={prog.programId}
                    className="bg-white p-4 rounded-xl border border-futurook-purple-medium/20 shadow-sm flex justify-between items-center hover:border-futurook-purple hover:shadow transition-all"
                  >
                    <div>
                      <span className="text-[10px] bg-futurook-purple/10 text-futurook-purple px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                        {prog.universityName}
                      </span>
                      <h5 className="font-bold text-sm text-futurook-dark mt-1">{prog.name}</h5>
                    </div>
                    <button
                      onClick={() => onSelectProgram(prog.universityId, prog.programId, getResults().info.title)}
                      className="bg-futurook-purple hover:bg-futurook-purple-dark text-white p-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 text-xs font-semibold"
                    >
                      Pre-registrarme <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={handleStartQuiz}
              className="px-6 py-3.5 rounded-2xl border-2 border-futurook-purple text-futurook-purple font-display font-semibold hover:bg-futurook-purple/5 transition-all text-sm flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Repetir Test Vocacional
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
