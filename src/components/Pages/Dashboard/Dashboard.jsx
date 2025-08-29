import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Paper,
} from "@mui/material";
import { Icon } from "@iconify/react";
import VSCodeEditor from "./VSCodeEditor";
import StatsCards from "./StatsCards";
import SnakeGame from "./SnakeGame";

const SkillCard = ({ title, icon, level, color, description }) => (
  <Box
    sx={{
      height: "100%",
      borderRadius: "8px", // set here
      background: (theme) =>
        theme.palette.mode === "dark"
          ? `linear-gradient(135deg, ${theme.palette[color].main}15 0%, ${theme.palette[color].main}08 100%)`
          : `linear-gradient(135deg, ${theme.palette[color].main}12 0%, ${theme.palette[color].main}06 100%)`,
      border: (theme) => `1px solid ${theme.palette[color].main}20`,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        // boxShadow: (theme) => `0 8px 25px ${theme.palette[color].main}25`,
        border: (theme) => `1px solid ${theme.palette[color].main}40`,
      },
    }}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: (theme) =>
              theme.palette.mode === "dark"
                ? `linear-gradient(135deg, ${theme.palette[color].main}25 0%, ${theme.palette[color].main}15 100%)`
                : `linear-gradient(135deg, ${theme.palette[color].main}20 0%, ${theme.palette[color].main}10 100%)`,
            color: `${color}.main`,
            border: (theme) => `2px solid ${theme.palette[color].main}30`,
          }}
        >
          {icon}
        </Box>
        <Chip
          label={level}
          sx={{
            backgroundColor: `${color}.main`,
            color: "white",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
          size="small"
        />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          lineHeight: 1.4,
        }}
      >
        {description}
      </Typography>
    </CardContent>
  </Box>
);

const Dashboard = () => {
  const profileData = {
    name: "Muhammad Shamroz Khan",
    title: "Full Stack Web Developer",
    bio: "Passionate web developer with expertise in modern JavaScript frameworks and backend technologies. I love creating efficient, scalable, and user-friendly web applications.",
    location: "Pakistan",
    email: "shamrozkhan@example.com",
    phone: "+92-XXX-XXXXXXX",
    experience: "3+ Years",
  };

  const skills = [
    {
      title: "React.js",
      icon: <Icon icon="logos:react" width={24} height={24} />,
      level: "Expert",
      color: "info",
      description:
        "Building dynamic UIs with hooks, context, and modern patterns",
    },
    {
      title: "Next.js",
      icon: <Icon icon="logos:nextjs-icon" width={24} height={24} />,
      level: "Advanced",
      color: "primary",
      description:
        "Server-side rendering, API routes, and full-stack applications",
    },
    {
      title: "Node.js",
      icon: <Icon icon="logos:nodejs-icon" width={24} height={24} />,
      level: "Advanced",
      color: "success",
      description: "Backend development with Express.js and RESTful APIs",
    },
    {
      title: "Material-UI",
      icon: <Icon icon="logos:material-ui" width={24} height={24} />,
      level: "Expert",
      color: "info",
      description:
        "Creating beautiful, responsive interfaces with MUI components",
    },
    {
      title: "Bootstrap",
      icon: <Icon icon="logos:bootstrap" width={24} height={24} />,
      level: "Expert",
      color: "secondary",
      description: "Responsive design and rapid prototyping",
    },
    {
      title: "Tailwind CSS",
      icon: <Icon icon="logos:tailwindcss-icon" width={24} height={24} />,
      level: "Advanced",
      color: "info",
      description: "Utility-first CSS framework for custom designs",
    },
  ];

  return (
    <Box sx={{ width: "100vw", maxWidth: "100%" }}>
      {/* VSCode Editor */}
      <div className="row ">
        <div className="col-12 col-lg-8 mb-4 mb-lg-0">
          <VSCodeEditor />
        </div>
        <div className="col-12 col-lg-4">
          <SnakeGame />
        </div>
      </div>
      <div className="mt-4">
        <StatsCards />
      </div>

      {/* Skills Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Technical Skills
        </Typography>
        <div className="row g-3">
          {skills.map((skill, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <SkillCard {...skill} />
            </div>
          ))}
        </div>
      </Paper>
    </Box>
  );
};

export default Dashboard;
