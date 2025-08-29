import React, { useState } from "react";
import { Box, Fab, Tooltip } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import Sidebar from "./Sidebar";
import { useThemeMode } from "../../context/ThemeContext";
import FloatingDots from "./FloatingDots";

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeMode();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", position: "relative", minHeight: "100vh" }}>
      {/* Floating dots background effect */}
      <FloatingDots />
      
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { xs: "100%", md: `calc(100% - 280px)` },
          backgroundColor: "background.default",
          minHeight: "100vh",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Outlet />
      </Box>

      {/* Floating Theme Toggle Button */}
      <Fab
        onClick={toggleTheme}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: isDarkMode 
            ? "linear-gradient(135deg, #EB5E28 0%, #C04410 100%)"
            : "linear-gradient(135deg, #EB5E28 0%, #C04410 100%)",
          color: "white",
          boxShadow: "0 8px 25px rgba(235, 94, 40, 0.3)",
          "&:hover": {
            background: isDarkMode 
              ? "linear-gradient(135deg, #C04410 0%, #A03308 100%)"
              : "linear-gradient(135deg, #C04410 0%, #A03308 100%)",
            transform: "scale(1.1)",
            boxShadow: "0 12px 35px rgba(235, 94, 40, 0.4)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <Tooltip
          title={isDarkMode ? "Turn on Lights" : "Turn off Lights"}
          arrow
          placement="left"
        >
          <Icon
            icon={
              isDarkMode
                ? "emojione-monotone:light-bulb"
                : "emojione:light-bulb"
            }
            width={28}
            height={28}
          />
        </Tooltip>
      </Fab>
    </Box>
  );
};

export default MainLayout;
