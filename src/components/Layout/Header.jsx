import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useThemeMode } from "../../context/ThemeContext";

const Header = ({ handleDrawerToggle }) => {
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - 280px)` },
        ml: { md: `280px` },
        color: "text.primary",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "background.header",
        overflow: "hidden", // ensures stars don't overflow
      }}
    >
      <Toolbar sx={{ position: "relative", overflow: "hidden" }}>
        {/* Galaxy stars across the navbar */}
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 4 + 2; // star size
          const top = Math.random() * 64; // AppBar height
          const delay = Math.random() * 5; // stagger start
          const duration = Math.random() * 40 + 30; // 3-8s speed
          const color = "#EB5E28";

          return (
            <Box
              key={i}
              sx={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: color,
                top,
                left: "-10px", // start off-screen
                opacity: Math.random() * 0.7 + 0.3,
                animation: `moveStar-${i} ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            >
              <style>
                {`
          @keyframes moveStar-${i} {
            0% { transform: translateX(0); }
            100% { transform: translateX(${window.innerWidth + 20}px); }
          }
        `}
              </style>
            </Box>
          );
        })}

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { md: "none" },
            px: 1.2,
            py: 0.5,
            borderRadius: "8px",
            backgroundColor: isDarkMode ? "#323232" : "#ffffff",
            zIndex: 1,
          }}
        >
          <Icon icon="material-symbols:menu" />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            noWrap
            className="welcome-text"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? "#ffffff" : "#2D2D30",
              backgroundColor: isDarkMode ? "#323232" : "#ffffff",
              maxWidth: "max-content",
              zIndex: 1,
            }}
          >
            <span className="wave fs-4 me-1">👋</span> Welcome! Good to see you
          </Typography>

          <Box
            onClick={toggleTheme}
            sx={{
              cursor: "pointer",
              userSelect: "none",
              px: 1.2,
              py: 0.5,
              borderRadius: "8px",
              backgroundColor: isDarkMode ? "#323232" : "#ffffff",
              zIndex: 1,
            }}
          >
            <Tooltip
              title={isDarkMode ? "Turn on Lights" : "Turn off Lights"}
              arrow
            >
              <Icon
                icon={
                  isDarkMode
                    ? "emojione-monotone:light-bulb"
                    : "emojione:light-bulb"
                }
                width={32}
                height={32}
                style={{
                  color: isDarkMode ? "#AAAAAA" : "#ffa126",
                  transition: "all 1s ease",
                }}
              />
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>

      <style>
        {`
        @keyframes flicker {
          0% { text-shadow: 0 0 4px #EB5E28, 0 0 8px #EB5E28, 0 0 12px #EB5E28; }
          25% { text-shadow: 0 0 5px #EB5E28, 0 0 9px #EB5E28, 0 0 13px #EB5E28; }
          50% { text-shadow: 0 0 4px #EB5E28, 0 0 8px #EB5E28, 0 0 12px #EB5E28; }
          75% { text-shadow: 0 0 6px #EB5E28, 0 0 10px #EB5E28, 0 0 14px #EB5E28; }
          100% { text-shadow: 0 0 4px #EB5E28, 0 0 8px #EB5E28, 0 0 12px #EB5E28; }
        }
      `}
      </style>
    </AppBar>
  );
};

export default Header;
