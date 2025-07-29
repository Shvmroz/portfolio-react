import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography as MuiTypography,
  Badge,
  List,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useAuth } from "../../context/AuthContext";
import ConfirmDialog from "../Extra/ConfirmDialog";

const Header = ({ handleDrawerToggle }) => {
  const { logout } = useAuth();

  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isNotificationsOpen = Boolean(anchorEl);

  const openConfirmDialog = () => setShowLogoutConfirm(true);
  const closeConfirmDialog = () => setShowLogoutConfirm(false);
  const handleConfirmLogout = () => {
    logout();
    closeConfirmDialog();
  };

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  // Sample notifications with read/unread status
  const notifications = [
    {
      id: 1,
      icon: "material-symbols:shopping-cart",
      title: "New order received",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      icon: "material-symbols:warning-rounded",
      title: "Product stock low",
      time: "30 min ago",
      unread: true,
    },
    {
      id: 3,
      icon: "material-symbols:person-add",
      title: "New user registered",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      icon: "material-symbols:update",
      title: "System update available",
      time: "Yesterday",
      unread: false,
    },
  ];

  // Calculate unread count
  const unreadCount = notifications.filter((n) => n.unread).length;

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
          Abaya Store
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            aria-label="show notifications"
            onClick={handleNotificationsClick}
          >
            <Badge
              badgeContent={unreadCount}
              color="primary"
              overlap="circular"
              invisible={unreadCount === 0}
            >
              <Icon icon="material-symbols:notifications" />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={isNotificationsOpen}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: {
                width: 320,
                maxHeight: 360,
                overflowY: "auto",
                p: 0,
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List sx={{ p: 0 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ p: "4px 10px" }}
              >
                Notifications
              </Typography>
              {notifications.length > 0 ? (
                notifications.map(({ id, icon, title, time, unread }) => (
                  <MenuItem
                    key={id}
                    onClick={handleNotificationsClose}
                    sx={{
                      alignItems: "flex-start",
                      py: 1,
                      px: 2,
                      borderRadius: 1,
                      m: 0.8,

                      backgroundColor: unread ? "primary.soft" : "inherit",
                      "&:hover": { backgroundColor: "primary.light" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: unread ? "primary.main" : "grey.400",
                          width: 36,
                          height: 36,
                        }}
                      >
                        <Icon icon={icon} width={20} height={20} color="#fff" />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <MuiTypography
                          variant="subtitle2"
                          sx={{
                            fontWeight: unread ? 600 : 400,
                            color: unread ? "primary.main" : "text.primary",
                          }}
                        >
                          {title}
                        </MuiTypography>
                      }
                      secondary={
                        <MuiTypography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {time}
                        </MuiTypography>
                      }
                    />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled sx={{ justifyContent: "center" }}>
                  No notifications
                </MenuItem>
              )}
            </List>
          </Menu>

          <Button
            color="primary"
            startIcon={<Icon icon="material-symbols:logout" />}
            onClick={openConfirmDialog}
            sx={{ ml: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>

      <ConfirmDialog
        open={showLogoutConfirm}
        onClose={closeConfirmDialog}
        onConfirm={handleConfirmLogout}
        title="Logout?"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </AppBar>
  );
};

export default Header;
