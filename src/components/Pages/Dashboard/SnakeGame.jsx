"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "./SnakeGame.css";

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gridSize = 20;
  const tileCount = 20;

  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 15, icon: "logos:react" });
  const dxRef = useRef(0);
  const dyRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const moveInterval = 120;

  const foodIcons = [
    "skill-icons:react-dark",
    "logos:flutter",
    "logos:nextjs-icon",
    "devicon:dart",
    "skill-icons:javascript",
    "logos:android-icon",
    "logos:apple-app-store",
    "devicon:chrome",
    "logos:safari",
    "noto:mobile-phone",
  ];

  const handleStartGame = () => {
    setScore(0);
    setGameOver(false);
    setGameRunning(true);

    snakeRef.current = [{ x: 10, y: 10 }];
    dxRef.current = 1;
    dyRef.current = 0;
    lastMoveTimeRef.current = 0;

    generateFood();
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };
    } while (snakeRef.current.some((segment) => segment.x === newFood.x && segment.y === newFood.y));

    const iconIndex = Math.floor(Math.random() * foodIcons.length);
    newFood.icon = foodIcons[iconIndex];
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
      const isDark = document.documentElement.classList.contains("dark");

      // Background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (isDark) {
        gradient.addColorStop(0, "#170a28");
        gradient.addColorStop(1, "#170a28");
      } else {
        gradient.addColorStop(0, "#f0f9ff");
        gradient.addColorStop(1, "#FFF7ED");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header
      ctx.fillStyle = isDark ? "#374151" : "#10b981";
      ctx.fillRect(0, 0, canvas.width, gridSize);

      // Score
      ctx.fillStyle = "#f0f9ff";
      ctx.font = "bold 14px monospace";
      ctx.fillText(`Score: ${score}`, 5, 14);

      // Pixel hearts
      const heartCount = 3;
      for (let i = 0; i < heartCount; i++) {
        const x = canvas.width - (i + 1) * (gridSize + 2);
        const y = 4;
        ctx.fillStyle = "red";
        ctx.fillRect(x + 1, y, 2, 2);
        ctx.fillRect(x + 4, y, 2, 2);
        ctx.fillRect(x, y + 2, 6, 2);
        ctx.fillRect(x + 1, y + 4, 4, 2);
        ctx.fillRect(x + 2, y + 6, 2, 2);
      }

      // Grid
      ctx.strokeStyle = isDark ? "#374151" : "#e2e8f0";
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, gridSize);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * gridSize + gridSize);
        ctx.lineTo(canvas.width, i * gridSize + gridSize);
        ctx.stroke();
      }

      // Snake
      if (!gameOver) {
        snakeRef.current.forEach((segment, index) => {
          ctx.fillStyle = index === 0 ? "#10b981" : "#34d399";
          const radius = index === 0 ? 4 : 0; // rounded head
          const xPos = segment.x * gridSize + 2;
          const yPos = segment.y * gridSize + gridSize + 2;

          ctx.beginPath();
          ctx.moveTo(xPos + radius, yPos);
          ctx.lineTo(xPos + gridSize - 4 - radius, yPos);
          ctx.quadraticCurveTo(xPos + gridSize - 4, yPos, xPos + gridSize - 4, yPos + radius);
          ctx.lineTo(xPos + gridSize - 4, yPos + gridSize - 4 - radius);
          ctx.quadraticCurveTo(xPos + gridSize - 4, yPos + gridSize - 4, xPos + gridSize - 4 - radius, yPos + gridSize - 4);
          ctx.lineTo(xPos + radius, yPos + gridSize - 4);
          ctx.quadraticCurveTo(xPos, yPos + gridSize - 4, xPos, yPos + gridSize - 4 - radius);
          ctx.lineTo(xPos, yPos + radius);
          ctx.quadraticCurveTo(xPos, yPos, xPos + radius, yPos);
          ctx.fill();

          // Eyes
          if (index === 0) {
            ctx.fillStyle = "white";
            const eyeSize = 4;
            const eyeOffsetX = dxRef.current === 0 ? 4 : dxRef.current === 1 ? 8 : dxRef.current === -1 ? 0 : 4;
            const eyeOffsetY = dyRef.current === 0 ? 4 : dyRef.current === 1 ? 8 : dyRef.current === -1 ? 0 : 4;

            ctx.beginPath();
            ctx.arc(xPos + 5 + eyeOffsetX, yPos + 5 + eyeOffsetY, eyeSize / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(xPos + 11 + eyeOffsetX, yPos + 5 + eyeOffsetY, eyeSize / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }
    };

    const moveSnake = (currentTime) => {
      if (!gameRunning || currentTime - lastMoveTimeRef.current < moveInterval) return;
      lastMoveTimeRef.current = currentTime;

      const dx = dxRef.current;
      const dy = dyRef.current;
      if (dx === 0 && dy === 0) return;

      const head = {
        x: (snakeRef.current[0].x + dx + tileCount) % tileCount,
        y: (snakeRef.current[0].y + dy + tileCount) % tileCount,
      };

      // Collision with self
      if (snakeRef.current.some((seg) => seg.x === head.x && seg.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        dxRef.current = 0;
        dyRef.current = 0;
        return;
      }

      snakeRef.current.unshift(head);

      // Eat food
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((prev) => prev + 10);
        generateFood();
      } else {
        snakeRef.current.pop();
      }
    };

    const handleMouseMove = (event) => {
      if (!gameRunning || gameOver) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const head = snakeRef.current[0];
      const headPixelX = head.x * gridSize + gridSize / 2;
      const headPixelY = head.y * gridSize + gridSize / 2;

      const deltaX = mouseX - headPixelX;
      const deltaY = mouseY - headPixelY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const newDx = deltaX > 0 ? 1 : -1;
        if (dxRef.current === 0) {
          dxRef.current = newDx;
          dyRef.current = 0;
        }
      } else {
        const newDy = deltaY > 0 ? 1 : -1;
        if (dyRef.current === 0) {
          dxRef.current = 0;
          dyRef.current = newDy;
        }
      }
    };

    const handleKeyDown = (e) => {
      if (!gameRunning || gameOver) return;
      switch (e.key) {
        case "ArrowUp":
          if (dyRef.current === 0) {
            dxRef.current = 0;
            dyRef.current = -1;
          }
          e.preventDefault();
          break;
        case "ArrowDown":
          if (dyRef.current === 0) {
            dxRef.current = 0;
            dyRef.current = 1;
          }
          e.preventDefault();
          break;
        case "ArrowLeft":
          if (dxRef.current === 0) {
            dxRef.current = -1;
            dyRef.current = 0;
          }
          e.preventDefault();
          break;
        case "ArrowRight":
          if (dxRef.current === 0) {
            dxRef.current = 1;
            dyRef.current = 0;
          }
          e.preventDefault();
          break;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    const gameLoop = (time) => {
      moveSnake(time);
      drawGame();
      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameRunning, gameOver, score]);

  return (
    <>
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={400}
          height={420}
          className="snake-canvas"
        />

        {gameRunning && !gameOver && foodRef.current.icon && (
          <div
            className="food-icon"
            style={{
              left: foodRef.current.x * gridSize,
              top: foodRef.current.y * gridSize + gridSize,
            }}
          >
            <Icon icon={foodRef.current.icon} width={gridSize - 4} height={gridSize - 4} />
          </div>
        )}

        {gameOver && (
          <div className="game-overlay">
            <div className="game-overlay-content">
              <div className="game-instructions">
                <p>Move your cursor or use arrow keys to control the snake</p>
                <p className="small-text">Eat tech icons to grow • Snake wraps around edges</p>
              </div>

              <button
                onClick={handleStartGame}
                className="restart-button"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}