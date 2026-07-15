import React from "react";
import { motion } from "motion/react";
import { GraduationCap, BarChart2 } from "lucide-react";

interface MascotBitProps {
  expression?: "idle" | "happy" | "thinking" | "talking";
  size?: "sm" | "md" | "lg" | "xl";
  showBubble?: boolean;
  bubbleText?: string;
  onClick?: () => void;
}

export default function MascotBit({
  expression = "idle",
  size = "md",
  showBubble = false,
  bubbleText = "",
  onClick,
}: MascotBitProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-28 h-28",
    lg: "w-44 h-44",
    xl: "w-64 h-64",
  };

  const bubbleSizes = {
    sm: "text-xs px-2 py-1 -top-10",
    md: "text-sm px-4 py-2 -top-16",
    lg: "text-base px-5 py-3 -top-24",
    xl: "text-lg px-6 py-4 -top-32",
  };

  // Determine animations based on expression
  const bodyAnimation = {
    idle: {
      y: [0, -6, 0],
      rotate: [0, 1, 0, -1, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
    happy: {
      y: [0, -12, 0, -8, 0],
      scale: [1, 1.05, 1, 1.03, 1],
      rotate: [0, -3, 3, -3, 0],
      transition: { duration: 1.2, ease: "easeInOut" },
    },
    thinking: {
      y: [0, -2, 0],
      rotate: [-2, 2, -2],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
    talking: {
      y: [0, -8, 0, -5, 0],
      scale: [1, 1.02, 1, 1.01, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const eyeAnimation = {
    idle: {
      scaleY: [1, 1, 0.1, 1, 1],
      transition: { duration: 4, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 1] },
    },
    happy: {
      scaleY: 1,
      scaleX: 1,
    },
    thinking: {
      scaleY: 0.8,
      y: -1,
    },
    talking: {
      scaleY: [1, 1, 0.1, 1, 1],
      transition: { duration: 3, repeat: Infinity },
    },
  };

  const leftHandAnimation = {
    idle: {
      rotate: [0, -10, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
    },
    happy: {
      rotate: [0, 30, -10, 30, 0],
      y: [0, -5, 0],
      transition: { duration: 1 },
    },
    thinking: {
      rotate: [-15, -15],
      y: 2,
    },
    talking: {
      rotate: [0, -20, 10, -10, 0],
      transition: { duration: 1.5, repeat: Infinity },
    },
  };

  const rightHandAnimation = {
    idle: {
      rotate: [0, 10, 0],
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
    },
    happy: {
      rotate: [0, -30, 10, -30, 0],
      y: [0, -5, 0],
      transition: { duration: 1 },
    },
    thinking: {
      rotate: [15, 10, 15],
      y: -2,
    },
    talking: {
      rotate: [0, 20, -10, 10, 0],
      transition: { duration: 1.6, repeat: Infinity },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Speech Bubble */}
      {showBubble && bubbleText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className={`absolute z-10 bg-white text-futurook-dark font-medium rounded-2xl shadow-xl border-2 border-futurook-purple-medium max-w-xs text-center flex items-center justify-center ${bubbleSizes[size]}`}
          style={{ transform: "translateX(-50%)" }}
        >
          <p className="leading-relaxed">{bubbleText}</p>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white" />
          <div className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-t-[11px] border-t-futurook-purple-medium -z-10" />
        </motion.div>
      )}

      {/* Mascot Body */}
      <motion.div
        animate={bodyAnimation[expression]}
        onClick={onClick}
        className={`relative cursor-pointer flex items-center justify-center ${sizeClasses[size]}`}
        style={{ perspective: "600px" }}
      >
        {/* Book Left Page Cover shadow & Background */}
        <div className="absolute inset-0 bg-futurook-purple rounded-2xl shadow-xl transform rotate-y-[-5deg] border-2 border-futurook-purple-dark" />
        
        {/* Book Inner Pages Structure */}
        <div className="absolute inset-[4px] bg-white rounded-xl flex shadow-inner overflow-hidden border border-gray-100">
          {/* Page Divider center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 z-10" />
          
          {/* Left Page content (Bar Chart) */}
          <div className="w-1/2 h-full flex flex-col items-center justify-center p-1 bg-gradient-to-r from-gray-50 to-white pr-2 border-r border-gray-100 relative">
            <motion.div 
              animate={expression === "thinking" ? { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 2 } } : {}}
              className="text-futurook-purple flex items-center justify-center"
            >
              <BarChart2 className="w-5/12 h-auto max-w-[28px] opacity-85" />
            </motion.div>
            
            {/* Mock text lines on left page */}
            <div className="w-8/12 h-[3px] bg-gray-200 rounded-full mt-2" />
            <div className="w-6/12 h-[3px] bg-gray-200 rounded-full mt-1" />
            <div className="w-7/12 h-[3px] bg-gray-200 rounded-full mt-1" />
          </div>

          {/* Right Page content (Graduation Cap & Mascot Face) */}
          <div className="w-1/2 h-full flex flex-col items-center justify-center p-1 bg-gradient-to-l from-gray-50 to-white pl-2 relative">
            <motion.div
              animate={expression === "happy" ? { rotate: [0, -10, 10, -10, 0] } : {}}
              className="text-futurook-purple flex items-center justify-center"
            >
              <GraduationCap className="w-6/12 h-auto max-w-[28px] opacity-85" />
            </motion.div>
            
            {/* Mock text lines on right page */}
            <div className="w-7/12 h-[3px] bg-gray-200 rounded-full mt-2" />
            <div className="w-8/12 h-[3px] bg-gray-200 rounded-full mt-1" />
            <div className="w-5/12 h-[3px] bg-gray-200 rounded-full mt-1" />
          </div>
        </div>

        {/* Mascot Face Overlay centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          {/* Face Area */}
          <div className="relative flex flex-col items-center justify-center w-full h-full pt-4">
            {/* Eyes Container */}
            <div className="flex justify-between w-6/12 max-w-[50px] mb-2">
              {/* Left Eye */}
              <motion.div
                animate={eyeAnimation[expression]}
                className="w-2.5 h-2.5 bg-futurook-dark rounded-full flex items-center justify-center relative"
                style={{ originY: 0.5 }}
              >
                {/* Pupil Sparkle */}
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </motion.div>

              {/* Right Eye */}
              <motion.div
                animate={eyeAnimation[expression]}
                className="w-2.5 h-2.5 bg-futurook-dark rounded-full flex items-center justify-center relative"
                style={{ originY: 0.5 }}
              >
                {/* Pupil Sparkle */}
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </motion.div>
            </div>

            {/* Rosy Cheeks */}
            <div className="absolute flex justify-between w-[58px] max-w-[70px] mt-1.5 opacity-60">
              <div className="w-2 h-2 bg-pink-400 rounded-full blur-[1px]" />
              <div className="w-2 h-2 bg-pink-400 rounded-full blur-[1px]" />
            </div>

            {/* Mouth */}
            <div className="mt-1 flex items-center justify-center">
              {expression === "happy" ? (
                // Happy open mouth
                <motion.div 
                  animate={{ scaleY: [1, 1.2, 1] }} 
                  className="w-4 h-3.5 bg-rose-500 rounded-b-full border-t border-futurook-dark" 
                />
              ) : expression === "thinking" ? (
                // Thinking squiggly/flat mouth
                <div className="w-3 h-0.5 bg-futurook-dark rounded-full" />
              ) : expression === "talking" ? (
                // Talking animated circle/oval mouth
                <motion.div
                  animate={{ scaleY: [1, 1.4, 0.8, 1.2, 1], scaleX: [1, 0.9, 1.1, 0.9, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-3.5 h-2.5 bg-rose-500 rounded-full border border-futurook-dark"
                />
              ) : (
                // Idle cute smile
                <div className="w-3.5 h-2 border-b-2 border-futurook-dark rounded-b-full" />
              )}
            </div>
          </div>
        </div>

        {/* Mascot Left Floating Hand */}
        <motion.div
          animate={leftHandAnimation[expression]}
          className="absolute -left-6 top-[40%] w-6 h-6 bg-futurook-purple rounded-full shadow-md flex items-center justify-center border border-futurook-purple-dark"
          style={{ originX: 1, originY: 0.5 }}
        >
          {/* Hand drawing lines */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Simple cute finger projection */}
            <div className="absolute -left-1 top-2 w-2 h-1.5 bg-futurook-purple rounded-full" />
          </div>
        </motion.div>

        {/* Mascot Right Floating Hand */}
        <motion.div
          animate={rightHandAnimation[expression]}
          className="absolute -right-6 top-[40%] w-6 h-6 bg-futurook-purple rounded-full shadow-md flex items-center justify-center border border-futurook-purple-dark"
          style={{ originX: 0, originY: 0.5 }}
        >
          {/* Hand drawing lines */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Simple cute finger projection pointing up or waving */}
            <div className="absolute -right-1 top-1 w-2 h-2 bg-futurook-purple rounded-full rotate-[-15deg]" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
