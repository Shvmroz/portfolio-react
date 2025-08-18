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
  CardActions,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { projects as initialProjects, techStacks } from "../../../data/portfolioData";
import ProjectDialog from "./ProjectDialog";
import { useSnackbar } from "notistack";
import ConfirmDialog from "../../Extra/ConfirmDialog";

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Confirm delete dialog states
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Menu state for each project card
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuProjectId, setMenuProjectId] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech =
      techFilter === "all" || project.technologies.includes(techFilter);
    return matchesSearch && matchesTech;
  });

  const handleAddProject = () => {
    setEditingProject(null);
    setDialogOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleMenuOpen = (event, projectId) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuProjectId(projectId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuProjectId(null);
  };

  const openConfirmDelete = (projectId) => {
    setDeletingProjectId(projectId);
    setConfirmDeleteOpen(true);
    handleMenuClose();
  };

  const closeConfirmDelete = () => {
    setDeletingProjectId(null);
    setConfirmDeleteOpen(false);
  };

  const handleDeleteProject = async (projectId) => {
    setDeleteLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setProjects(projects.filter((p) => p.id !== projectId));
      enqueueSnackbar("Project deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to delete project", { variant: "error" });
    } finally {
      setDeleteLoading(false);
      closeConfirmDelete();
    }
  };

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? { ...projectData, id: editingProject.id }
            : p
        )
      );
      enqueueSnackbar("Project updated successfully", { variant: "success" });
    } else {
      const newProject = {
        ...projectData,
        id: Math.max(...projects.map((p) => p.id)) + 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProjects([newProject, ...projects]);
      enqueueSnackbar("Project added successfully", { variant: "success" });
    }
    setDialogOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "warning";
      case "Planning":
        return "info";
      default:
        return "default";
    }
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
          My Projects
        </Typography>
        <Button
          className="gradient-button"
          variant="contained"
          startIcon={<Icon icon="material-symbols:add" />}
          onClick={handleAddProject}
        >
          Add Project
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <div className="row gx-2 gy-3 align-items-center">
            <div className="col-12 col-sm-6 col-md-4">
              <TextField
                fullWidth
                placeholder="Search projects..."
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
                <InputLabel>Technology</InputLabel>
                <Select
                  value={techFilter}
                  onChange={(e) => setTechFilter(e.target.value)}
                  label="Technology"
                >
                  <MenuItem value="all">All Technologies</MenuItem>
                  {techStacks.map((tech) => (
                    <MenuItem key={tech} value={tech}>
                      {tech}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-sm-12 col-md-5 d-flex justify-content-end">
              <Typography variant="body2" color="text.secondary">
                {filteredProjects.length} of {projects.length} projects
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="row g-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="col-12 col-md-6 col-lg-4 d-flex"
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
                height="200"
                image={project.image}
                alt={project.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent className="pb-1" sx={{ flexGrow: 1 }}>
                <Typography
                  noWrap
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={project.status}
                    color={getStatusColor(project.status)}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                  {project.technologies.length > 3 && (
                    <Chip
                      label={`+${project.technologies.length - 3}`}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  )}
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
                    menuProjectId === project.id ? "project-menu" : undefined
                  }
                  aria-haspopup="true"
                  onClick={(e) => handleMenuOpen(e, project.id)}
                  size="small"
                >
                  <Icon icon="material-symbols:more-vert" />
                </IconButton>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                {project.liveUrl && (
                  <Button
                    size="small"
                    startIcon={<Icon icon="material-symbols:open-in-new" />}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    size="small"
                    startIcon={<Icon icon="mdi:github" />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Button>
                )}
              </CardActions>
            </Card>
          </div>
        ))}
      </div>

      {/* Menu for edit/delete */}
      <Menu
        id="project-menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            const project = projects.find((p) => p.id === menuProjectId);
            if (project) handleEditProject(project);
          }}
        >
          <Icon icon="material-symbols:edit" style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => openConfirmDelete(menuProjectId)}>
          <Icon icon="material-symbols:delete" style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmDeleteOpen}
        onClose={closeConfirmDelete}
        onConfirm={() => handleDeleteProject(deletingProjectId)}
        title="Delete Project?"
        description="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
      />

      {/* Project Add/Edit Dialog */}
      <ProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </Box>
  );
};

export default Projects;