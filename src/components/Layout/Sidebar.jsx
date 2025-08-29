import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
  IconButton,
  Fab,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import myImage from "../../assets/1752006032367.png";

const drawerWidth = 280;

const menuItems = [
  {
    text: "Dashboard",
    icon: <Icon icon="material-symbols:person" />,
    path: "/dashboard",
  },
  {
    text: "Projects",
    icon: <Icon icon="material-symbols:code" />,
    path: "/projects",
  },
  {
    text: "CV & Resume",
    icon: <Icon icon="material-symbols:description" />,
    path: "/cv",
  },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.sidebar",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
        {/* Mobile menu button */}
        <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end", mb: 2 }}>
          <Fab
            size="small"
            onClick={handleDrawerToggle}
            sx={{
              background: "linear-gradient(135deg, #EB5E28 0%, #C04410 100%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #C04410 0%, #A03308 100%)",
              },
            }}
          >
            <Icon icon="material-symbols:close" />
          </Fab>
        </Box>
        
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <a href={myImage} target="_blank" rel="noopener noreferrer">
            <Avatar
              src={myImage}
              sx={{
                width: 60,
                height: 60,
                mr: 2,
                background: "linear-gradient(135deg, #EB5E28 0%, #C04410 100%)",
                cursor: "pointer", // shows hand cursor
              }}
            />
          </a>

          <Box>
            <Typography
              className="text-uppercase"
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              Shamroz Khan
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Frontend Developer
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "primary.main"
                      : "secondary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "primary.dark"
                        : "secondary.dark",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
                "&:hover": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "#772b00"
                      : "secondary.light",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* <SidebarContactForm /> */}
      <Divider />

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, p: 2 }}>
        {/* Email */}
        <IconButton
          component="a"
          href="mailto:shvmroz@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="mdi:email" fontSize={24} />
        </IconButton>

        {/* LinkedIn */}
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/shvmroz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="mdi:linkedin" fontSize={24} color="#0A66C2" />
        </IconButton>
        {/* GitHub */}
        <IconButton
          component="a"
          href="https://github.com/Shvmroz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="mdi:github" fontSize={26} />
        </IconButton>

        {/* WhatsApp */}
        <IconButton
          component="a"
          href="https://wa.me/923066520002"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="mdi:whatsapp" fontSize={24} color="#25D366" />
        </IconButton>

        {/* Instagram */}
        <IconButton
          component="a"
          href="https://www.instagram.com/shvmroz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="mdi:instagram" fontSize={26} color="#E4405F" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
