import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Switch,
  FormControlLabel,
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
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <Icon icon="material-symbols:menu" />
        </IconButton>

        <Typography
          className="text-uppercase"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          Muhammad Shamroz Khan
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                icon={<Icon icon="material-symbols:light-mode" />}
                checkedIcon={<Icon icon="material-symbols:dark-mode" />}
              />
            }
            label=""
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;