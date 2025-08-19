import React, { useRef } from "react";
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
  Avatar,
  Stack,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import myImage from "../../../assets/1752006032367.png";

const CV = () => {
  const cvRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const cvData = {
    personalInfo: {
      name: "Muhammad Shamroz Khan",
      title: "Web Application Developer",
      email: "shvmroz@gmail.com",
      phone: "+923066520002",
      location: "Sahiwal Division, Punjab, Pakistan",
      linkedin: "https://www.linkedin.com/in/shvmroz",
      github: "https://github.com/shvmroz",
    },
    summary:
      "Passionate Web Application Developer with hands-on experience building React and Node applications. Skilled in modern frontend and backend technologies, with a focus on performance and maintainability.",
    experience: [
      {
        id: 1,
        companyName: "Meta Logix Tech",
        role: "React Developer",
        type: "Internship",
        period: "Oct 2024 - Present · 11 mos",
        location: "Sahiwal Division, Punjab, Pakistan",
        tags: ["React.js"],
      },
      {
        id: 2,
        companyName: "Medtronix Systems",
        role: "React Developer",
        type: "Part-time",
        period: "May 2024 - Aug 2024 · 4 mos",
        location: "Sahiwal Division, Punjab, Pakistan · On-site",
        tags: ["React.js"],
      },
    ],
    education: [
      {
        id: 1,
        institution: "Government College University, Faisalabad",
        degree: "Master's degree, Computer Science",
        period: "Nov 2021 - Apr 2023",
        extra: "Grade: 3.4",
      },
    ],
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Material-UI",
      "Tailwind CSS",
      "Git",
      "Netlify",
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
  };

  const handleDownloadCV = async () => {
    if (!cvRef.current) return;
    try {
      const element = cvRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Shamroz_CV.pdf");
      enqueueSnackbar("CV downloaded", { variant: "success" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to download CV", { variant: "error" });
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

        <Button
          startIcon={<Icon icon="mdi:download" />}
          variant="outlined"
          size="small"
          onClick={handleDownloadCV}
        >
          Download CV
        </Button>
      </Box>

      {/* CV Content (full width Paper) */}
      <Paper ref={cvRef} elevation={1} sx={{ width: "100%", mb: 3, p: 3 }}>
        {/* Personal Info */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={myImage}
                alt="Shamroz"
                sx={{
                  width: 64,
                  height: 64,
                  mr: 2,
                  background: "linear-gradient(135deg,#EB5E28,#C04410)",
                }}
              />
              <Box>
                <Typography sx={{ fontWeight: 700 }}>
                  {cvData.personalInfo.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {cvData.personalInfo.title}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 1 }} />

            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Icon icon="ic:outline-email" width={18} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a
                      href={`mailto:${cvData.personalInfo.email}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {cvData.personalInfo.email}
                    </a>
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Icon icon="line-md:phone" width={18} />
                </ListItemIcon>
                <ListItemText primary={cvData.personalInfo.phone} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Icon icon="material-symbols:location-on" width={18} />
                </ListItemIcon>
                <ListItemText primary={cvData.personalInfo.location} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Icon icon="mdi:linkedin" width={18} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a
                      href={cvData.personalInfo.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      LinkedIn
                    </a>
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Icon icon="mdi:github" width={18} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <a
                      href={cvData.personalInfo.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      GitHub
                    </a>
                  }
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {cvData.skills.map((s, i) => (
                <Chip key={i} label={s} size="small" />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Summary */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Professional Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cvData.summary}
          </Typography>
        </Paper>

        {/* Work Experience */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Work Experience
          </Typography>
          {cvData.experience.map((exp) => (
            <Box key={exp.id} sx={{ mb: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar variant="rounded" sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    {exp.companyName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {exp.role} • {exp.type}
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ ml: 7, mt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {exp.role}
                </Typography>
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  {exp.period}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {exp.location}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {(exp.tags || []).map((t, idx) => (
                    <Chip key={idx} label={t} size="small" />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </Paper>

        {/* Education */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Education
          </Typography>
          {cvData.education.map((edu) => (
            <Box key={edu.id} sx={{ mb: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar variant="rounded" sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    {edu.institution}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {edu.degree}
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ ml: 7, mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {edu.period} • {edu.extra}
                </Typography>
              </Box>

              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </Paper>

        {/* Certifications */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Certifications
          </Typography>
          {cvData.certifications.map((c) => (
            <Box key={c.id} sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>{c.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {c.issuer} • {c.year}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Paper>
    </Box>
  );
};

export default CV;
