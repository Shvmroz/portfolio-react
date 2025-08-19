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
  CardActions,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { projects as initialProjects, techStacks } from "../../../data/portfolioData";


const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState("all");



  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech =
      techFilter === "all" || project.technologies.includes(techFilter);
    return matchesSearch && matchesTech;
  });




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
    </Box>
  );
};

export default Projects;