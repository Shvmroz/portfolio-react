import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";

const CV = () => {
  const [editMode, setEditMode] = useState(false);
  const [cvData, setCvData] = useState({
    personalInfo: {
      name: "Muhammad Shamroz Khan",
      title: "Full Stack Web Developer",
      email: "shamrozkhan@example.com",
      phone: "+92-XXX-XXXXXXX",
      location: "Pakistan",
      linkedin: "linkedin.com/in/shamrozkhan",
      github: "github.com/shamrozkhan",
    },
    summary: "Passionate Full Stack Web Developer with 3+ years of experience in building modern web applications using React.js, Next.js, Node.js, and various other technologies. Strong problem-solving skills and a keen eye for detail.",
    experience: [
      {
        id: 1,
        title: "Full Stack Developer",
        company: "Tech Solutions Inc.",
        duration: "2022 - Present",
        description: "Developed and maintained web applications using React.js, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "Digital Agency",
        duration: "2021 - 2022",
        description: "Created responsive web interfaces using React.js, Material-UI, and Bootstrap. Worked closely with designers to implement pixel-perfect designs.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Computer Science",
        institution: "University of Technology",
        year: "2021",
        description: "Graduated with honors. Specialized in Software Engineering and Web Development.",
      },
    ],
    skills: [
      "React.js", "Next.js", "Node.js", "JavaScript", "TypeScript",
      "Material-UI", "Bootstrap", "Tailwind CSS", "MongoDB", "PostgreSQL",
      "Git", "Docker", "AWS", "REST APIs", "GraphQL"
    ],
    certifications: [
      {
        id: 1,
        name: "React Developer Certification",
        issuer: "Meta",
        year: "2023",
      },
      {
        id: 2,
        name: "Node.js Certification",
        issuer: "Node.js Foundation",
        year: "2022",
      },
    ],
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleDownloadCV = () => {
    enqueueSnackbar("CV download feature will be implemented soon!", { variant: "info" });
  };

  const handleSaveCV = () => {
    setEditMode(false);
    enqueueSnackbar("CV updated successfully!", { variant: "success" });
  };

  const handleInputChange = (section, field) => (event) => {
    if (section === 'personalInfo') {
      setCvData({
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          [field]: event.target.value,
        },
      });
    } else {
      setCvData({
        ...cvData,
        [field]: event.target.value,
      });
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
          CV & Resume
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Icon icon="material-symbols:edit" />}
            onClick={() => setEditMode(true)}
          >
            Edit CV
          </Button>
          <Button
            variant="contained"
            startIcon={<Icon icon="material-symbols:download" />}
            onClick={handleDownloadCV}
          >
            Download PDF
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Personal Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Icon icon="material-symbols:person" />
                  </ListItemIcon>
                  <ListItemText primary={cvData.personalInfo.name} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon icon="material-symbols:work" />
                  </ListItemIcon>
                  <ListItemText primary={cvData.personalInfo.title} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon icon="material-symbols:email" />
                  </ListItemIcon>
                  <ListItemText primary={cvData.personalInfo.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon icon="material-symbols:phone" />
                  </ListItemIcon>
                  <ListItemText primary={cvData.personalInfo.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon icon="material-symbols:location-on" />
                  </ListItemIcon>
                  <ListItemText primary={cvData.personalInfo.location} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon icon="mdi:linkedin" />
                  </ListItemIcon>
                  <ListItemText primary={cvData.personalInfo.linkedin} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon icon="mdi:github" />
                  </ListItemIcon>
                  <ListItemText primary={cvData.personalInfo.github} />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Technical Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {cvData.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Summary */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Professional Summary
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {cvData.summary}
            </Typography>
          </Paper>

          {/* Experience */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Work Experience
            </Typography>
            {cvData.experience.map((exp, index) => (
              <Box key={exp.id} sx={{ mb: index < cvData.experience.length - 1 ? 3 : 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {exp.title}
                </Typography>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                  {exp.company} • {exp.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {exp.description}
                </Typography>
                {index < cvData.experience.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Paper>

          {/* Education */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Education
            </Typography>
            {cvData.education.map((edu, index) => (
              <Box key={edu.id} sx={{ mb: index < cvData.education.length - 1 ? 3 : 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {edu.degree}
                </Typography>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                  {edu.institution} • {edu.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.description}
                </Typography>
                {index < cvData.education.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Paper>

          {/* Certifications */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Certifications
            </Typography>
            {cvData.certifications.map((cert, index) => (
              <Box key={cert.id} sx={{ mb: index < cvData.certifications.length - 1 ? 2 : 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {cert.name}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  {cert.issuer} • {cert.year}
                </Typography>
                {index < cvData.certifications.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Edit CV Dialog */}
      <Dialog open={editMode} onClose={() => setEditMode(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit CV Information</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Full Name"
                  value={cvData.personalInfo.name}
                  onChange={handleInputChange('personalInfo', 'name')}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Professional Title"
                  value={cvData.personalInfo.title}
                  onChange={handleInputChange('personalInfo', 'title')}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Email"
                  value={cvData.personalInfo.email}
                  onChange={handleInputChange('personalInfo', 'email')}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  label="Phone"
                  value={cvData.personalInfo.phone}
                  onChange={handleInputChange('personalInfo', 'phone')}
                />
              </div>
            </div>
            
            <Typography variant="h6" sx={{ mb: 2 }}>Professional Summary</Typography>
            <TextField
              fullWidth
              label="Summary"
              multiline
              rows={4}
              value={cvData.summary}
              onChange={handleInputChange(null, 'summary')}
              sx={{ mb: 3 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditMode(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCV}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CV;