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
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 280;

const menuItems = [
  {
    text: "Dashboard",
    icon: <Icon icon="material-symbols:dashboard" />,
    path: "/dashboard",
  },
  {
    text: "Products",
    icon: <Icon icon="material-symbols:inventory" />,
    path: "/products",
  },
  {
    text: "Orders",
    icon: <Icon icon="material-symbols:shopping-cart" />,
    path: "/orders",
  },
  {
    text: "Settings",
    icon: <Icon icon="material-symbols:settings" />,
    path: "/settings",
  },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

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
        {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2  }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "primary.main" }}
          >
            Abaya Store
          </Typography>
        </Box> */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
            <Icon icon="material-symbols:person" />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
              {user?.name}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Administrator
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
                  backgroundColor: "secondary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
                "&:hover": {
                  backgroundColor: "secondary.light",
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

      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          © 2024 Abaya Store Admin
        </Typography>
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
