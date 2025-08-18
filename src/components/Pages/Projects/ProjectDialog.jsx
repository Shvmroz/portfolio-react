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
  Chip,
  OutlinedInput,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { techStacks } from "../../../data/portfolioData";

const ProjectDialog = ({ open, onClose, onSave, project }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    status: "Planning",
    image: "",
    liveUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title: "",
        description: "",
        technologies: [],
        status: "Planning",
        image: "",
        liveUrl: "",
        githubUrl: "",
      });
    }
  }, [project]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleTechnologiesChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      technologies: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
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
    onSave(formData);
  };

  const isValid = formData.title && formData.description && formData.technologies.length > 0;

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
          {project ? "Edit Project" : "Add New Project"}
        </Typography>
        <IconButton onClick={onClose}>
          <Icon icon="material-symbols:close" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <div className="row pt-2">
          {/* Left Image Column */}
          <div className="col-md-4 text-center" style={{ position: "relative" }}>
            <Avatar
              src={formData.image}
              variant="rounded"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />

            <input
              accept="image/*"
              id="image-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

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
              <Icon icon="material-symbols:photo-camera" width={24} height={24} />
            </label>

            <Typography
              variant="caption"
              color="text.disabled"
              display="block"
              sx={{ mt: 2, mb: 2 }}
            >
              Project Screenshot
            </Typography>
          </div>

          {/* Right Form Column */}
          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-12">
                <TextField
                  fullWidth
                  label="Project Title"
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
                <FormControl fullWidth required>
                  <InputLabel>Technologies</InputLabel>
                  <Select
                    multiple
                    value={formData.technologies}
                    onChange={handleTechnologiesChange}
                    input={<OutlinedInput label="Technologies" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {techStacks.map((tech) => (
                      <MenuItem key={tech} value={tech}>
                        {tech}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6">
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={handleChange("status")}
                    label="Status"
                  >
                    <MenuItem value="Planning">Planning</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Live URL"
                  value={formData.liveUrl}
                  onChange={handleChange("liveUrl")}
                  placeholder="https://example.com"
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="GitHub URL"
                  value={formData.githubUrl}
                  onChange={handleChange("githubUrl")}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isValid}>
          {project ? "Update Project" : "Add Project"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;