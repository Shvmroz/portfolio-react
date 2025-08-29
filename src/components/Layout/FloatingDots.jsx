import React from "react";
import { Box } from "@mui/material";
import { useThemeMode } from "../../context/ThemeContext";

const FloatingDots = () => {
  const { isDarkMode } = useThemeMode();

  // Generate random dots with different sizes and speeds
  const dots = Array.from({ length: 80 }, (_, i) => {
    const size = Math.random() * 6 + 2; // 2-8px
    const duration = Math.random() * 20 + 15; // 15-35s
    const delay = Math.random() * 10; // 0-10s delay
    const opacity = Math.random() * 0.4 + 0.1; // 0.1-0.5 opacity
    const startX = Math.random() * 100; // random start position
    const startY = Math.random() * 100;
    
    return {
      id: i,
      size,
      duration,
      delay,
      opacity,
      startX,
      startY,
    };
  });

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {dots.map((dot) => (
        <Box
          key={dot.id}
          sx={{
            position: "absolute",
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            backgroundColor: isDarkMode ? "#EB5E28" : "#EB5E28",
            opacity: dot.opacity,
            left: `${dot.startX}%`,
            top: `${dot.startY}%`,
            animation: `floatDot-${dot.id} ${dot.duration}s linear infinite`,
            animationDelay: `${dot.delay}s`,
          }}
        >
          <style>
            {`
              @keyframes floatDot-${dot.id} {
                0% {
                  transform: translate(0, 0) rotate(0deg);
                  opacity: ${dot.opacity};
                }
                25% {
                  transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(90deg);
                  opacity: ${dot.opacity * 1.5};
                }
                50% {
                  transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) rotate(180deg);
                  opacity: ${dot.opacity * 0.8};
                }
                75% {
                  transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(270deg);
                  opacity: ${dot.opacity * 1.2};
                }
                100% {
                  transform: translate(0, 0) rotate(360deg);
                  opacity: ${dot.opacity};
                }
              }
            `}
          </style>
        </Box>
      ))}
    </Box>
  );
};

export default FloatingDots;