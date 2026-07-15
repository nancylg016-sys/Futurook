import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  School,
  FileText,
  UserCheck,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Settings,
  HelpCircle,
  Menu,
  X,
  Target,
  Eye,
  Heart,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import MascotBit from "./components/MascotBit";
import BitChatBot from "./components/BitChatBot";
import VocationalQuiz from "./components/VocationalQuiz";
import UniversityExplorer from "./components/UniversityExplorer";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import AdminConsole from "./components/AdminConsole";
import { Registration } from "./types";
import { UNIVERSITIES } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("inicio");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [activeRegistration, setActiveRegistration] = useState<Registration | null>(null);
  
  // Selection state for form pre-filling
  const [preselectedUniId, setPreselectedUniId] = useState("");
  const [preselectedProgId, setPreselectedProgId] = useState("");
  const [preselectedArea, setPreselectedArea] = useState("");
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("futurook_registrations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Registration[];
        setRegistrations(parsed);
        // Set the most recent registration as active
        if (parsed.length > 0) {
          setActiveRegistration(parsed[parsed.length - 1]);
        }
      } catch (e) {
        console.error("Error loading registrations", e);
      }
    }
  }, []);

  // Save to local storage when state changes
  const saveRegistrations = (updated: Registration[]) => {
    setRegistrations(updated);
    localStorage.setItem("futurook_registrations", JSON.stringify(updated));
  };

  const handleNewRegistration = (newReg: Registration) => {
    const updated = [...registrations, newReg];
    saveRegistrations(updated);
    setActiveRegistration(newReg);
    setActiveTab("portal"); // Switch directly to student portal to view ticket
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateStatus = (id: string, newStatus: "Pendiente" | "Confirmado" | "En Curso") => {
    const updated = registrations.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    saveRegistrations(updated);
    if (activeRegistration && activeRegistration.id === id) {
      setActiveRegistration({ ...activeRegistration, status: newStatus });
    }
  };

  const handleDeleteRegistration = (id: string) => {
    const updated = registrations.filter((r) => r.id !== id);
    saveRegistrations(updated);
    if (activeRegistration && activeRegistration.id === id) {
      setActiveRegistration(updated.length > 0 ? updated[updated.length - 1] : null);
    }
  };

  const handleClearAll = () => {
    saveRegistrations([]);
    setActiveRegistration(null);
  };

  const handleCancelRegistration = () => {
    if (activeRegistration) {
      const updated = registrations.filter((r) => r.id !== activeRegistration.id);
      saveRegistrations(updated);
      setActiveRegistration(null);
    }
    setActiveTab("registro");
  };

  const handleSelectProgramAndNavigate = (uniId: string, progId: string, area = "") => {
    setPreselectedUniId(uniId);
    setPreselectedProgId(progId);
    setPreselectedArea(area);
    setActiveTab("registro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 relative overflow-x-hidden pb-12 selection:bg-futurook-purple/30">
      
      {/* BACKGROUND FLOATING DECORATIONS (To match slide style corners) */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-futurook-purple/5 pointer-events-none rounded-br-full" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-futurook-purple/5 pointer-events-none rounded-bl-full" />
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              onClick={() => setActiveTab("inicio")}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <div className="relative w-11 h-11 bg-futurook-purple-light rounded-2xl flex items-center justify-center border-2 border-futurook-purple group-hover:border-futurook-purple-dark transition-all shadow-sm overflow-hidden">
                <MascotBit expression="idle" size="sm" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-futurook-purple group-hover:text-futurook-purple-dark transition-colors block">
                  Futurook
                </span>
                <span className="text-[10px] text-gray-400 font-mono tracking-widest font-bold uppercase -mt-1 block">
                  Identidad del mañana
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5">
              {[
                { id: "inicio", label: "Inicio", icon: Compass },
                { id: "test", label: "Test Vocacional", icon: Sparkles },
                { id: "explorar", label: "Explorar Carreras", icon: School },
                { id: "registro", label: "Pre-registro", icon: FileText },
                { id: "portal", label: "Mi Comprobante", icon: UserCheck, badge: activeRegistration ? "Activo" : undefined },
                { id: "admin", label: "Admin", icon: Settings },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-futurook-purple bg-futurook-purple-light"
                        : "text-gray-500 hover:text-futurook-purple hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {tab.label}
                    {tab.badge && (
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold animate-pulse">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu trigger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-500 hover:text-futurook-purple rounded-xl hover:bg-gray-50"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 bg-white"
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                {[
                  { id: "inicio", label: "Inicio", icon: Compass },
                  { id: "test", label: "Test Vocacional", icon: Sparkles },
                  { id: "explorar", label: "Explorar Carreras", icon: School },
                  { id: "registro", label: "Pre-registro", icon: FileText },
                  { id: "portal", label: "Mi Comprobante", icon: UserCheck },
                  { id: "admin", label: "Consola Admin", icon: Settings },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "text-futurook-purple bg-futurook-purple-light"
                          : "text-gray-500 hover:text-futurook-purple hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN BODY CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: INICIO (HOME) */}
          {activeTab === "inicio" && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* SLIDE 1 REPLICATION: HERO SCREEN WITH MASCOUT */}
              <div className="relative rounded-3xl p-8 md:p-14 bg-gradient-to-br from-gray-100 via-gray-50 to-white border-2 border-futurook-purple-medium/20 shadow-lg overflow-hidden flex flex-col items-center justify-center text-center">
                
                {/* Custom purple corner chevrons to exactly mimic provided slide 1 */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  {/* Diagonal stripe style */}
                  <div className="absolute top-4 left-4 w-8 h-20 bg-futurook-purple/40 rotate-45 transform origin-top-left" />
                  <div className="absolute top-4 left-4 w-20 h-8 bg-futurook-purple/40 rotate-45 transform origin-top-left" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none rotate-180">
                  <div className="absolute top-4 left-4 w-8 h-20 bg-futurook-purple/40 rotate-45 transform origin-top-left" />
                  <div className="absolute top-4 left-4 w-20 h-8 bg-futurook-purple/40 rotate-45 transform origin-top-left" />
                </div>

                {/* Floating Mascot Bit aligned to logo */}
                <div className="mb-6 relative flex items-center justify-center">
                  <MascotBit expression="happy" size="lg" />
                  <div className="absolute -top-4 -right-12 bg-white px-3 py-1.5 rounded-full shadow-md border border-futurook-purple text-xs font-bold text-futurook-purple animate-pulse">
                    ¡Hola! Soy Bit 👋
                  </div>
                </div>

                <h1 className="font-display font-extrabold text-5xl md:text-7xl text-futurook-purple leading-none tracking-tight drop-shadow-sm select-none">
                  Futurook
                </h1>
                <p className="font-display font-medium text-lg md:text-2xl text-slate-500 mt-2 tracking-wide uppercase">
                  Identidad del mañana
                </p>

                <p className="text-gray-500 max-w-xl mx-auto mt-6 text-sm leading-relaxed font-medium">
                  Conectamos a estudiantes con una red de universidades aliadas en El Salvador para brindar orientación vocacional práctica. ¡Descubre tus pasiones y da tus primeros pasos hoy!
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab("test")}
                    className="bg-futurook-purple hover:bg-futurook-purple-dark text-white font-display font-bold px-8 py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    Hacer Test Vocacional <Sparkles className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveTab("explorar")}
                    className="bg-white hover:bg-gray-50 text-futurook-purple font-display font-bold px-8 py-4 rounded-2xl border-2 border-futurook-purple shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    Explorar Universidades <School className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* SLIDE 4 REPLICATION: DETAIL OF MASCOT GREETING */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
                <div className="lg:col-span-5 flex justify-center">
                  <MascotBit expression="talking" size="lg" />
                </div>
                <div className="lg:col-span-7 space-y-5 text-left">
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-futurook-purple-light text-futurook-purple text-xs font-bold font-mono rounded-full uppercase">
                    👾 Mascota Oficial
                  </div>
                  <h3 className="font-display font-extrabold text-3xl text-futurook-dark">
                    "¡HOLA SOY BIT! SOY LA MASCOTA DE FUTUROOK"
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    Te ayudaré en todo este camino a descubrir qué es Futurook, qué te apasiona y cómo registrarte a tu universidad de preferencia. Como tu librito guía, mis páginas están llenas de retos de ingeniería, medicina, diseño y más. ¡Pregúntame lo que quieras!
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={() => {
                        const botTrigger = document.getElementById("bit-trigger");
                        if (botTrigger) botTrigger.click();
                      }}
                      className="bg-futurook-purple-light hover:bg-futurook-purple text-futurook-purple hover:text-white font-bold px-6 py-3 rounded-xl transition-all text-sm inline-flex items-center gap-2 border border-futurook-purple-medium/30"
                    >
                      Conversar en Directo con Bit <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* SLIDE 3 REPLICATION: QUE ES FUTUROOK DETAIL WITH SPLIT IMAGE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                {/* Text section (7 cols) */}
                <div className="lg:col-span-7 p-8 md:p-12 text-left space-y-6">
                  <div className="inline-flex items-center gap-1.5 bg-futurook-purple-light text-futurook-purple text-xs font-bold font-mono rounded-full px-3 py-1 uppercase">
                    🌟 Propósito Clave
                  </div>
                  
                  <h3 className="font-display font-black text-3xl md:text-4xl text-futurook-dark leading-tight">
                    ¿Qué es Futurook? 📖✨
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Somos una <strong>plataforma sin fines de lucro</strong> que conecta a una red de universidades para ofrecer a los estudiantes orientación vocacional a través de experiencias prácticas y mentorías, ayudándolos a descubrir sus habilidades, intereses y aptitudes antes de elegir una carrera profesional.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-gray-500">
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 bg-green-100 rounded-full text-green-600 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                      <span>Orientación 100% gratuita</span>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 bg-green-100 rounded-full text-green-600 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                      <span>Talleres prácticos vivenciales</span>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 bg-green-100 rounded-full text-green-600 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                      <span>Mentores de UEES, UJMD y UCA</span>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 bg-green-100 rounded-full text-green-600 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                      <span>Dirigido a jóvenes de 15 a 17 años</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Collage Section (5 cols) */}
                <div className="lg:col-span-5 h-full min-h-[340px] relative bg-slate-100 flex flex-col divide-y divide-white">
                  <div className="flex-1 bg-cover bg-center min-h-[120px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop')" }}>
                    {/* Overlay styling for visual premiumness */}
                    <div className="w-full h-full bg-futurook-purple/10 backdrop-brightness-75 flex items-end p-4 text-white font-display font-bold text-sm">
                      Clases Prácticas Reales
                    </div>
                  </div>
                  <div className="flex-1 bg-cover bg-center min-h-[120px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop')" }}>
                    <div className="w-full h-full bg-futurook-purple/10 backdrop-brightness-75 flex items-end p-4 text-white font-display font-bold text-sm">
                      Laboratorios de Ingeniería
                    </div>
                  </div>
                  <div className="flex-1 bg-cover bg-center min-h-[120px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop')" }}>
                    <div className="w-full h-full bg-futurook-purple/10 backdrop-brightness-75 flex items-end p-4 text-white font-display font-bold text-sm">
                      Talleres de Diseño Creativo
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 5 REPLICATION: WHY FUTUROOK WAS BORN (DONUT CHART & FACTS) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm text-left">
                {/* Stats textual (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-bold font-mono rounded-full px-3 py-1 uppercase">
                    📊 Realidad Nacional
                  </div>
                  <h3 className="font-display font-black text-3xl text-futurook-dark">
                    ¿Por qué nace Futurook? 🤔🇸🇻
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    En El Salvador, muchos jóvenes eligen una carrera sin conocer realmente sus capacidades e intereses. El resultado: <strong>menos del 5%</strong> de quienes ingresan a la educación superior logran graduarse, y solo en 2023, cerca de <strong>2,000 estudiantes</strong> abandonaron la universidad por desinterés, migración o problemas económicos.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    La falta de orientación vocacional afecta al estudiante y frena el desarrollo social y económico del país. Futurook ofrece una respuesta directa y aplicable.
                  </p>

                  <div className="border-l-4 border-futurook-purple pl-4 italic text-sm text-gray-500 mt-4">
                    "Vivir un reto práctico guiado por estudiantes universitarios te permite probar la carrera antes de pagar una matrícula."
                  </div>
                </div>

                {/* Donut Chart representation (5 cols) */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-gray-100">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* SVG Circular representation of 5% graduation rate */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="75"
                        stroke="#e2e8f0"
                        strokeWidth="18"
                        fill="transparent"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="75"
                        stroke="#A881C2"
                        strokeWidth="18"
                        fill="transparent"
                        strokeDasharray="471"
                        strokeDashoffset="447" // Represents 5% (471 * 0.95 = 447)
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    {/* Center details */}
                    <div className="absolute flex flex-col items-center">
                      <span className="font-display font-black text-4xl text-futurook-dark">5%</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Se Gradúa</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6 text-xs font-semibold">
                    <div className="flex items-center gap-1.5 text-futurook-purple">
                      <span className="w-3.5 h-3.5 bg-futurook-purple rounded" /> Se Gradúa (5%)
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <span className="w-3.5 h-3.5 bg-gray-200 rounded" /> Deserta o No Completa (95%)
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 6 REPLICATION: MISSION, VISION, VALUES */}
              <div className="space-y-6">
                <div className="text-center max-w-lg mx-auto">
                  <span className="text-xs font-mono font-black text-futurook-purple uppercase tracking-wider">Conoce más de nosotros</span>
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl text-futurook-dark mt-1">
                    Nuestra Identidad Colectiva 🧭
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Mission */}
                  <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-futurook-purple-medium transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-futurook-purple-light text-futurook-purple flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Target className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-xl text-futurook-dark mb-3">Misión</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Brindar mayor seguridad a los jóvenes al momento de elegir su carrera profesional, reduciendo el cambio o abandono de estudios durante los primeros años universitarios.
                    </p>
                  </div>

                  {/* Vision */}
                  <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-futurook-purple-medium transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-futurook-purple-light text-futurook-purple flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-xl text-futurook-dark mb-3">Visión</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Que los jóvenes tomen decisiones vocacionales informadas y responsables, con pleno conocimiento de sus intereses, habilidades y aptitudes.
                    </p>
                  </div>

                  {/* Values */}
                  <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-futurook-purple-medium transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-futurook-purple-light text-futurook-purple flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-xl text-futurook-dark mb-3">Valores</h4>
                    <div className="space-y-2 mt-1">
                      <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-futurook-purple rounded-full" /> Cooperación
                      </div>
                      <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-futurook-purple rounded-full" /> Conocimiento
                      </div>
                      <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-futurook-purple rounded-full" /> Compromiso
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 7 REPLICATION: VEN DIAGRAM (HOW IT WORKS) */}
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm text-center space-y-8">
                <div className="max-w-xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-black text-futurook-purple uppercase tracking-wider">
                    ¿Cómo funciona Futurook?
                  </span>
                  <h3 className="font-display font-extrabold text-3xl text-futurook-dark">
                    La Fórmula de la Orientación Práctica 🌀
                  </h3>
                </div>

                {/* Venn Diagram Visual Structure */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 max-w-4xl mx-auto py-4 relative">
                  {/* Left Circle: Red de Universidades */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="w-80 h-80 rounded-full bg-teal-50 border-4 border-teal-200/60 p-6 flex flex-col justify-center items-center text-center shadow-inner md:translate-x-6 z-10"
                  >
                    <School className="w-10 h-10 text-teal-600 mb-3" />
                    <h4 className="font-display font-extrabold text-sm text-teal-800 uppercase tracking-wide">
                      Red de Universidades
                    </h4>
                    <p className="text-xs text-teal-700/85 leading-relaxed mt-2.5">
                      Cada universidad aliada aporta su propia infraestructura, laboratorios, aulas y materiales según el reto a desarrollar. El costo del programa no lo define Futurook: cada universidad decide si incluye una cuota para cubrir materiales, o si lo ofrece sin costo.
                    </p>
                  </motion.div>

                  {/* Overlap point text marker */}
                  <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 rounded-full bg-purple-900/90 text-white border-2 border-white text-xs font-black uppercase z-20 shadow-md">
                    <span className="text-[10px]">Taller</span>
                    <span>Práctico</span>
                  </div>

                  {/* Right Circle: Mentorship */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="w-80 h-80 rounded-full bg-violet-50 border-4 border-violet-200/60 p-6 flex flex-col justify-center items-center text-center shadow-inner md:-translate-x-6 z-10"
                  >
                    <BookOpen className="w-10 h-10 text-violet-600 mb-3" />
                    <h4 className="font-display font-extrabold text-sm text-violet-800 uppercase tracking-wide">
                      Mentorship (Mentorías)
                    </h4>
                    <p className="text-xs text-violet-700/85 leading-relaxed mt-2.5">
                      Futurook conecta a una red de universidades como UCA, UJMD y UEES que convocan a sus propios estudiantes para cumplir horas sociales como mentores. Cada mentor recibe una inducción corta de 3 días, donde aprenden a guiar a los estudiantes de bachillerato a través de retos reales.
                    </p>
                  </motion.div>
                </div>

                <p className="text-sm font-semibold text-futurook-purple-dark italic">
                  * Es un programa dirigido principalmente a jóvenes de 15 a 17 años de bachillerato.
                </p>
              </div>

              {/* STATS DE UNIVERSIDADES CONSORCIAS BANNER */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-futurook-purple/10 rounded-full blur-2xl" />
                <h3 className="font-display font-extrabold text-2xl md:text-3xl">
                  ¿Listo para elegir tu futuro profesional? 🚀
                </h3>
                <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
                  Haz el test con Bit, explora las carreras de las universidades asociadas o regístrate hoy mismo. ¡El mañana pertenece a los informados!
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setActiveTab("test")}
                    className="bg-futurook-purple hover:bg-futurook-purple-dark text-white text-sm font-bold px-6 py-3.5 rounded-xl transition-all shadow"
                  >
                    Hacer Test Vocacional
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: TEST VOCACIONAL */}
          {activeTab === "test" && (
            <motion.div
              key="test"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <VocationalQuiz onSelectProgram={handleSelectProgramAndNavigate} />
            </motion.div>
          )}

          {/* TAB 3: EXPLORAR CARRERAS */}
          {activeTab === "explorar" && (
            <motion.div
              key="explorar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <UniversityExplorer
                onSelectProgram={handleSelectProgramAndNavigate}
                selectedUniversityId={preselectedUniId}
                selectedProgramId={preselectedProgId}
              />
            </motion.div>
          )}

          {/* TAB 4: PRE-REGISTRO */}
          {activeTab === "registro" && (
            <motion.div
              key="registro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <RegistrationForm
                preselectedUniversityId={preselectedUniId}
                preselectedProgramId={preselectedProgId}
                preselectedArea={preselectedArea}
                onSuccess={handleNewRegistration}
              />
            </motion.div>
          )}

          {/* TAB 5: PORTAL ESTUDIANTE (VOUCHER) */}
          {activeTab === "portal" && (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {activeRegistration ? (
                <Dashboard registration={activeRegistration} onCancel={handleCancelRegistration} />
              ) : (
                <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-xl max-w-xl mx-auto py-14">
                  <div className="flex justify-center mb-6">
                    <MascotBit expression="thinking" size="lg" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-futurook-dark mb-2">
                    No tienes registros activos 🔍
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">
                    No hemos encontrado ningún pase reservado con tus datos locales. Completa el formulario de pre-registro para descargar tu pase.
                  </p>
                  <button
                    onClick={() => setActiveTab("registro")}
                    className="bg-futurook-purple hover:bg-futurook-purple-dark text-white font-display font-bold px-6 py-3.5 rounded-xl transition-all shadow-md"
                  >
                    Pre-registrarme Ahora
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 6: ADMIN CONSOLE */}
          {activeTab === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AdminConsole
                registrations={registrations}
                onUpdateStatus={handleUpdateStatus}
                onDeleteRegistration={handleDeleteRegistration}
                onClearAll={handleClearAll}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* CHATBOT AI FLOAT (BIT MASCOT ACTIVE) */}
      <BitChatBot
        onSuggestProgram={handleSelectProgramAndNavigate}
        onNavigateToQuiz={() => setActiveTab("test")}
      />

      {/* FOOTER */}
      <footer className="mt-auto border-t border-gray-100 bg-white py-8 text-center text-xs text-gray-400 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-sm text-futurook-purple">Futurook</span>
            <span className="text-gray-300">|</span>
            <span>Identidad del mañana © 2026</span>
          </div>
          <div className="flex gap-4 text-gray-500 font-medium">
            <button onClick={() => setActiveTab("inicio")} className="hover:text-futurook-purple">Inicio</button>
            <button onClick={() => setActiveTab("test")} className="hover:text-futurook-purple">Test Vocacional</button>
            <button onClick={() => setActiveTab("explorar")} className="hover:text-futurook-purple">Explorar Carreras</button>
            <button onClick={() => setActiveTab("admin")} className="hover:text-futurook-purple">Evaluación de Universidades</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
