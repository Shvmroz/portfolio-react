"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "./SnakeGame.css";
import { useThemeMode } from "../../../context/ThemeContext";

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [canvasSize, setCanvasSize] = useState(390);
  useEffect(() => {
    const updateSize = () => {
      // clamp between 340 and 390
      const size = Math.min(Math.max(window.innerWidth - 40, 340), 390);
      setCanvasSize(size);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const canvasWidth = canvasSize;
  const canvasHeight = canvasSize;
  const gridSize = Math.floor(canvasSize / 15);
  const tileCountX = Math.ceil(canvasWidth / gridSize);
  const tileCountY = Math.ceil(canvasHeight / gridSize) - 1;

  const snakeRef = useRef([{ x: 5, y: 5 }]);
  const foodRef = useRef({ x: 10, y: 10, icon: "logos:react" });
  const dxRef = useRef(0);
  const dyRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const moveInterval = 120;

  const { isDarkMode } = useThemeMode();

  const foodIcons = [
    "logos:react",
    "logos:flutter",
    "skill-icons:nextjs-dark",
    "devicon:dart",
    "skill-icons:javascript",
    "logos:android-icon",
    "logos:apple-app-store",
    "devicon:chrome",
    "logos:safari",
    "fluent-emoji-flat:mobile-phone",
    "skill-icons:html",
    "logos:material-ui",
    "logos:tailwindcss-icon",
    "devicon:bootstrap",
  ];

  const handleStartGame = () => {
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
    snakeRef.current = [{ x: 5, y: 5 }];
    dxRef.current = 1;
    dyRef.current = 0;
    lastMoveTimeRef.current = 0;
    generateFood();
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * tileCountX),
        y: Math.floor(Math.random() * tileCountY),
      };
    } while (
      snakeRef.current.some((seg) => seg.x === newFood.x && seg.y === newFood.y)
    );
    newFood.icon = foodIcons[Math.floor(Math.random() * foodIcons.length)];
    foodRef.current = newFood;
  };

  useEffect(() => {
    handleStartGame();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawGame = () => {
      // Background
      ctx.fillStyle = isDarkMode ? "#1e1400" : "#FFFCF2";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Header
      ctx.fillStyle = isDarkMode ? "#2D2D30" : "#EB5E28";
      ctx.fillRect(0, 0, canvasWidth, gridSize);

      // Score
      ctx.fillStyle = "#f0f9ff";
      ctx.font = "bold 14px monospace";
      ctx.fillText(`Score: ${score}`, 5, 16);

      // Grid
      ctx.strokeStyle = isDarkMode ? "#382814" : "#ffe1d6";
      for (let i = 0; i <= tileCountX; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, gridSize);
        ctx.lineTo(i * gridSize, canvasHeight);
        ctx.stroke();
      }
      for (let i = 0; i <= tileCountY; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize + gridSize);
        ctx.lineTo(canvasWidth, i * gridSize + gridSize);
        ctx.stroke();
      }

      // Snake
      if (!gameOver) {
        snakeRef.current.forEach((seg, idx) => {
          ctx.fillStyle = idx === 0 ? "#EB5E28" : "#e69776";
          const radius = idx === 0 ? 4 : 0;
          const xPos = seg.x * gridSize + 2;
          const yPos = seg.y * gridSize + gridSize + 2;

          ctx.beginPath();
          ctx.moveTo(xPos + radius, yPos);
          ctx.lineTo(xPos + gridSize - 4 - radius, yPos);
          ctx.quadraticCurveTo(
            xPos + gridSize - 4,
            yPos,
            xPos + gridSize - 4,
            yPos + radius
          );
          ctx.lineTo(xPos + gridSize - 4, yPos + gridSize - 4 - radius);
          ctx.quadraticCurveTo(
            xPos + gridSize - 4,
            yPos + gridSize - 4,
            xPos + gridSize - 4 - radius,
            yPos + gridSize - 4
          );
          ctx.lineTo(xPos + radius, yPos + gridSize - 4);
          ctx.quadraticCurveTo(
            xPos,
            yPos + gridSize - 4,
            xPos,
            yPos + gridSize - 4 - radius
          );
          ctx.lineTo(xPos, yPos + radius);
          ctx.quadraticCurveTo(xPos, yPos, xPos + radius, yPos);
          ctx.fill();

          if (idx === 0) {
            ctx.fillStyle = "white";
            const eyeSize = 4;
            const eyeOffsetX =
              dxRef.current === 0
                ? 4
                : dxRef.current === 1
                ? 8
                : dxRef.current === -1
                ? 0
                : 4;
            const eyeOffsetY =
              dyRef.current === 0
                ? 4
                : dyRef.current === 1
                ? 8
                : dyRef.current === -1
                ? 0
                : 4;

            ctx.beginPath();
            ctx.arc(
              xPos + 5 + eyeOffsetX,
              yPos + 5 + eyeOffsetY,
              eyeSize / 2,
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
              xPos + 11 + eyeOffsetX,
              yPos + 5 + eyeOffsetY,
              eyeSize / 2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        });
      }
    };

    const moveSnake = (time) => {
      if (!gameRunning || time - lastMoveTimeRef.current < moveInterval) return;
      lastMoveTimeRef.current = time;

      const dx = dxRef.current;
      const dy = dyRef.current;
      if (dx === 0 && dy === 0) return;

      const head = {
        x: (snakeRef.current[0].x + dx + tileCountX) % tileCountX,
        y: (snakeRef.current[0].y + dy + tileCountY) % tileCountY,
      };

      if (snakeRef.current.some((s) => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        dxRef.current = 0;
        dyRef.current = 0;
        return;
      }

      snakeRef.current.unshift(head);

      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((s) => s + 10);
        generateFood();
      } else snakeRef.current.pop();
    };

    const handleMouseMove = (e) => {
      if (!gameRunning || gameOver) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const head = snakeRef.current[0];
      const headX = head.x * gridSize + gridSize / 2;
      const headY = head.y * gridSize + gridSize / 2;

      const dx = mouseX - headX;
      const dy = mouseY - headY;

      if (Math.abs(dx) > Math.abs(dy)) {
        const ndx = dx > 0 ? 1 : -1;
        if (dxRef.current === 0) {
          dxRef.current = ndx;
          dyRef.current = 0;
        }
      } else {
        const ndy = dy > 0 ? 1 : -1;
        if (dyRef.current === 0) {
          dxRef.current = 0;
          dyRef.current = ndy;
        }
      }
    };

    const handleKeyDown = (e) => {
      if (!gameRunning || gameOver) return;
      // Prevent arrow keys from scrolling the page
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case "ArrowUp":
          if (dyRef.current === 0) {
            dxRef.current = 0;
            dyRef.current = -1;
          }
          break;
        case "ArrowDown":
          if (dyRef.current === 0) {
            dxRef.current = 0;
            dyRef.current = 1;
          }
          break;
        case "ArrowLeft":
          if (dxRef.current === 0) {
            dxRef.current = -1;
            dyRef.current = 0;
          }
          break;
        case "ArrowRight":
          if (dxRef.current === 0) {
            dxRef.current = 1;
            dyRef.current = 0;
          }
          break;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    const loop = (time) => {
      moveSnake(time);
      drawGame();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameRunning, gameOver, score, isDarkMode]);

  return (
    <div
      className="canvas-wrapper"
      style={{ width: canvasWidth, height: canvasHeight }}
    >
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="snake-canvas"
      />
      {/* Hearts as Iconify icons */}
      <div className="hearts-wrapper">
        {[0, 1, 2].map((i) => (
          <Icon
            key={i}
            icon="mdi:heart"
            width={16}
            height={16}
            style={{
              position: "absolute",
              top: 4,
              right: 4 + i * 20,
              color: isDarkMode ? "#FF4D4D" : "#FFFCF2",
              zIndex: 15,
            }}
          />
        ))}
      </div>

      {gameRunning && !gameOver && foodRef.current.icon && (
        <div
          className="food-icon"
          style={{
            left: foodRef.current.x * gridSize,
            top: foodRef.current.y * gridSize + gridSize,
          }}
        >
          <Icon
            icon={foodRef.current.icon}
            width={gridSize - 4}
            height={gridSize - 4}
          />
        </div>
      )}

      {gameOver && (
        <div className="game-overlay">
          <div className="game-overlay-content">
            <div className="game-instructions">Game Over</div>
            <button onClick={handleStartGame} className="restart-button">
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
