import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { orders as initialOrders } from "../../../data/dummyData";
import { useSnackbar } from "notistack";

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "warning";
      case "Shipped":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOrderDetailOpen(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    enqueueSnackbar(`Order status updated to ${newStatus}`, {
      variant: "success",
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Orders
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="material-symbols:search" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="all">All Status</MenuItem>
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {filteredOrders.length} of {orders.length} orders
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Rs {order.total.toLocaleString()}
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <FormControl size="small">
                      <Select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        variant="outlined"
                        sx={{
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                      >
                        {statusOptions.map((status) => (
                          <MenuItem key={status} value={status}>
                            <Chip
                              label={status}
                              color={getStatusColor(status)}
                              size="small"
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewOrder(order)}
                      color="primary"
                    >
                      <Icon icon="material-symbols:visibility" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog
        open={orderDetailOpen}
        onClose={() => setOrderDetailOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, display: "flex", alignItems: "center" }}
                    >
                      <Icon
                        icon="material-symbols:person"
                        style={{ marginRight: 8 }}
                      />
                      Customer Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1">
                        {selectedOrder.customerName}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">
                        {selectedOrder.phone}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, display: "flex", alignItems: "center" }}
                    >
                      <Icon
                        icon="material-symbols:calendar-today"
                        style={{ marginRight: 8 }}
                      />
                      Order Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body1">
                        {selectedOrder.date}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip
                        label={selectedOrder.status}
                        color={getStatusColor(selectedOrder.status)}
                        size="small"
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total
                      </Typography>
                      <Typography variant="h6" color="primary">
                        Rs {selectedOrder.total.toLocaleString()}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Order Items
                    </Typography>
                    <List>
                      {selectedOrder.items.map((item, index) => (
                        <React.Fragment key={index}>
                          <ListItem>
                            <ListItemText primary={item.product} />
                            <Typography variant="body2">
                              Rs {item.price.toLocaleString()}
                            </Typography>
                          </ListItem>
                          {index < selectedOrder.items.length - 1 && (
                            <Divider />
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOrderDetailOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Orders;
