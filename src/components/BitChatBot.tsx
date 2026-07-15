import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Sparkles, MessageCircle, RefreshCw, X, HelpCircle, Loader2 } from "lucide-react";
import { Message } from "../types";
import MascotBit from "./MascotBit";

interface BitChatBotProps {
  onSuggestProgram?: (universityId: string, programId: string) => void;
  onNavigateToQuiz?: () => void;
}

export default function BitChatBot({ onSuggestProgram, onNavigateToQuiz }: BitChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "¡Hola! 🌸 Soy Bit, la mascota oficial de Futurook. Eres bienvenido(a) a mi rincón de aprendizaje. Te guiaré paso a paso a descubrir tus talentos y elegir el programa universitario ideal en El Salvador. Actualmente conectamos con UEES, UJMD y UCA, ¡y pronto más! ¿Qué te apasiona hacer?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bitExpression, setBitExpression] = useState<"idle" | "happy" | "thinking" | "talking">("idle");
  const [bubbleText, setBubbleText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle preset suggestions
  const handlePresetClick = (text: string) => {
    sendMessage(text);
  };

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: String(Date.now()),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setBitExpression("thinking");
    setBubbleText("Mmm... ¡Déjame revisar mis apuntes!");

    try {
      const chatHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        throw new Error("Fallo la conexión con el servidor");
      }

      const data = await response.json();
      
      setBitExpression("talking");
      setBubbleText("¡Aquí está!");

      setTimeout(() => {
        setBitExpression("idle");
        setBubbleText("");
      }, 3000);

      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: data.text || "Vaya, se me cruzaron los cables un segundito. ¿Podrías repetirlo?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setBitExpression("thinking");
      setBubbleText("¡Uy, tengo las hojas enredadas!");
      
      const errorMessage: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: "¡Hola! Parece que tengo un pequeño problema para conectarme a mi base de conocimientos. Recuerda que puedes explorar las universidades en la sección inferior o tomar el Test Vocacional interactivo directamente.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "¡Listo! He limpiado mi libreta. Pregúntame lo que quieras sobre orientación vocacional, las carreras o cómo pre-registrarte en UEES, UJMD o UCA. ✨",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setBitExpression("happy");
    setTimeout(() => setBitExpression("idle"), 2000);
  };

  const presets = [
    { text: "🧠 ¿Qué universidad me recomiendas?", action: "Recomiéndame una universidad en El Salvador" },
    { text: "🏫 ¿Qué carreras tiene la UCA?", action: "Háblame de las ingenierías de la UCA" },
    { text: "🎨 ¿Cuál es la oferta de la Matías?", action: "Háblame de Diseño Gráfico o Arquitectura en la UJMD" },
    { text: "🩺 ¿Qué ofrece la Evangélica?", action: "Háblame de Doctorado en Medicina de la UEES" },
  ];

  return (
    <>
      {/* Floating Mascot Button */}
      {!isOpen && (
        <motion.div
          id="bit-trigger"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-center cursor-pointer group"
          onClick={() => {
            setIsOpen(true);
            setBitExpression("happy");
            setTimeout(() => setBitExpression("idle"), 1500);
          }}
        >
          {/* Badge indicator */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce font-bold shadow-md z-20">
            AI
          </div>
          
          {/* Hover tooltips */}
          <div className="absolute -top-12 right-0 bg-futurook-dark text-white text-xs py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-futurook-purple-medium">
            ¡Chatea con Bit! 🧠📖
          </div>

          <div className="bg-white p-3 rounded-full shadow-2xl border-2 border-futurook-purple hover:border-futurook-purple-dark transition-all duration-300">
            <MascotBit expression={bitExpression} size="sm" />
          </div>
        </motion.div>
      )}

      {/* Slide-out Chat Window */}
      {isOpen && (
        <motion.div
          id="bit-chat-window"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-futurook-purple flex flex-col overflow-hidden h-[560px] max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-futurook-purple p-4 text-white flex items-center justify-between shadow-md relative">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-full overflow-hidden w-11 h-11 flex items-center justify-center border-2 border-white/40">
                <MascotBit expression={isLoading ? "thinking" : bitExpression} size="sm" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-base leading-none">Bit</h3>
                  <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded font-mono font-medium">Asesor AI</span>
                </div>
                <p className="text-xs text-futurook-purple-light mt-1">¡Orientación Vocacional Activa!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={clearChat}
                title="Reiniciar chat"
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Prompt/Banner for Vocational Test inside Chat */}
          <div className="bg-futurook-purple-light px-4 py-2 text-xs border-b border-futurook-purple-medium/30 flex items-center justify-between text-futurook-purple-dark">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> ¿Prefieres un test de opción múltiple?
            </span>
            <button 
              onClick={() => {
                setIsOpen(false);
                if (onNavigateToQuiz) onNavigateToQuiz();
              }}
              className="font-bold underline hover:text-futurook-purple-dark"
            >
              Iniciar Test
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-6 h-6 bg-futurook-purple/10 rounded-full flex items-center justify-center text-xs shrink-0 font-bold text-futurook-purple">
                      B
                    </div>
                  )}
                  <div>
                    <div
                      className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        message.role === "user"
                          ? "bg-futurook-purple text-white rounded-tr-none"
                          : "bg-white text-futurook-dark border border-gray-100 rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block px-1 text-right">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%] items-center">
                  <div className="w-6 h-6 bg-futurook-purple/10 rounded-full flex items-center justify-center text-xs shrink-0">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-futurook-purple" />
                  </div>
                  <div className="bg-white px-4 py-2.5 rounded-2xl border border-gray-100 text-sm text-gray-500 rounded-tl-none italic flex items-center gap-1.5 shadow-sm">
                    Bit está pensando...
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Presets suggestions panel */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-4 py-2 bg-white border-t border-gray-100">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Sugerencias para empezar:</p>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handlePresetClick(p.action)}
                    className="text-xs bg-futurook-purple-light hover:bg-futurook-purple-medium/40 text-futurook-purple-dark px-2.5 py-1.5 rounded-full border border-futurook-purple-medium/30 transition-all font-medium"
                  >
                    {p.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input form */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Pregúntale a Bit sobre carreras..."
              disabled={isLoading}
              className="flex-1 bg-gray-50 text-futurook-dark text-sm rounded-xl px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-futurook-purple disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="bg-futurook-purple text-white p-2.5 rounded-xl hover:bg-futurook-purple-dark disabled:opacity-50 disabled:hover:bg-futurook-purple transition-all shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
