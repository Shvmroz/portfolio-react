import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
} from "@mui/material";
import { Icon } from "@iconify/react";
import {
  products as initialProducts,
  categories,
} from "../../../data/dummyData";
import ProductDialog from "./ProductDialog";
import { useSnackbar } from "notistack";
import ConfirmDialog from "../../Extra/ConfirmDialog";

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Confirm delete dialog states
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Menu state for each product card
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuProductId, setMenuProductId] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleMenuOpen = (event, productId) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuProductId(productId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuProductId(null);
  };

  const openConfirmDelete = (productId) => {
    setDeletingProductId(productId);
    setConfirmDeleteOpen(true);
    handleMenuClose();
  };

  const closeConfirmDelete = () => {
    setDeletingProductId(null);
    setConfirmDeleteOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    setDeleteLoading(true);
    try {
      // Simulate delete delay
      await new Promise((r) => setTimeout(r, 500));
      setProducts(products.filter((p) => p.id !== productId));
      enqueueSnackbar("Product deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to delete product", { variant: "error" });
    } finally {
      setDeleteLoading(false);
      closeConfirmDelete();
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...productData, id: editingProduct.id }
            : p
        )
      );
      enqueueSnackbar("Product updated successfully", { variant: "success" });
    } else {
      const newProduct = {
        ...productData,
        id: Math.max(...products.map((p) => p.id)) + 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProducts([newProduct, ...products]);
      enqueueSnackbar("Product added successfully", { variant: "success" });
    }
    setDialogOpen(false);
  };

  const getStatusColor = (stock) => {
    if (stock > 20) return "success";
    if (stock > 10) return "warning";
    return "error";
  };

  const getStatusText = (stock) => {
    if (stock > 20) return "In Stock";
    if (stock > 10) return "Low Stock";
    return "Out of Stock";
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Products
        </Typography>
        <Button
          className="gradient-button"
          variant="contained"
          startIcon={<Icon icon="material-symbols:add" />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <div className="row gx-2 gy-3 align-items-center">
            <div className="col-12 col-sm-6 col-md-4">
              <TextField
                fullWidth
                placeholder="Search products..."
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
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-sm-12 col-md-5 d-flex justify-content-end">
              <Typography variant="body2" color="text.secondary">
                {filteredProducts.length} of {products.length} products
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="row g-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent className="pb-1" sx={{ flexGrow: 1 }}>
                <Typography
                  noWrap
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    Rs {product.price.toLocaleString()}
                  </Typography>
                  <Chip
                    label={getStatusText(product.stock)}
                    color={getStatusColor(product.stock)}
                    size="small"
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Chip
                    label={product.category}
                    variant="outlined"
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                </Box>

                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    color: "#403D39",
                    backgroundColor: "#d3d3d37a",
                 
                  }}
                  aria-controls={
                    menuProductId === product.id ? "product-menu" : undefined
                  }
                  aria-haspopup="true"
                  onClick={(e) => handleMenuOpen(e, product.id)}
                  size="small"
                >
                  <Icon icon="material-symbols:more-vert" />
                </IconButton>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Menu for edit/delete */}
      <Menu
        id="product-menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            const product = products.find((p) => p.id === menuProductId);
            if (product) handleEditProduct(product);
          }}
        >
          <Icon icon="material-symbols:edit" style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => openConfirmDelete(menuProductId)}>
          <Icon icon="material-symbols:delete" style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmDeleteOpen}
        onClose={closeConfirmDelete}
        onConfirm={() => handleDeleteProduct(deletingProductId)}
        title="Delete Product?"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
      />

      {/* Product Add/Edit Dialog */}
      <ProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </Box>
  );
};

export default Products;
