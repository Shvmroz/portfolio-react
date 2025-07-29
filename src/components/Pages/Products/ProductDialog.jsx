import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { categories } from "../../../data/dummyData";

const ProductDialog = ({ open, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    sku: "",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        sku: "",
      });
    }
  }, [product]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you would upload the image to a server
      // For now, we'll use a placeholder
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };
    onSave(productData);
  };

  const isValid =
    formData.title &&
    formData.description &&
    formData.price &&
    formData.stock &&
    formData.category;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          {product ? "Edit Product" : "Add New Product"}
        </Typography>
        <IconButton onClick={onClose}>
          <Icon icon="material-symbols:close" />
        </IconButton>
      </DialogTitle>

      <DialogContent >
        <div className="row pt-2">
          {/* Left Image Column */}
          <div
            className="col-md-4 text-center"
            style={{ position: "relative" }}
          >
            {/* Image */}
            <Avatar
              src={formData.image}
              variant="rounded"
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            {/* Hidden Input */}
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {/* Overlay Upload Button */}
            <label
              htmlFor="image-upload"
              style={{
                position: "absolute",
                top: 6,
                right: 18,
                background: "rgba(255,255,255,0.8)",
                borderRadius: "50%",
                padding: 6,
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              <Icon
                icon="material-symbols:photo-camera"
                width={24}
                height={24}
              />
            </label>

            {/* Caption */}
            <Typography
              variant="caption"
              color="text.disabled"
              display="block"
              sx={{ mt: 2, mb: 2 }}
            >
              Recommended Ratio 1:1 or 400x400
            </Typography>
          </div>

          {/* Right Form Column */}
          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-12">
                <TextField
                  fullWidth
                  label="Product Title"
                  value={formData.title}
                  onChange={handleChange("title")}
                  required
                />
              </div>
              <div className="col-12">
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={handleChange("description")}
                  multiline
                  rows={4}
                  required
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Price (Rs)"
                  type="number"
                  value={formData.price}
                  onChange={handleChange("price")}
                  required
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange("stock")}
                  required
                />
              </div>
              <div className="col-md-6">
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={handleChange("category")}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="SKU"
                  value={formData.sku}
                  onChange={handleChange("sku")}
                  placeholder="e.g., ABY-001"
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isValid}>
          {product ? "Update Product" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
