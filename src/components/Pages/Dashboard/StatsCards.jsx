import { Card, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const statsData = [
  {
    id: 1,
    number: "15+",
    label: "Projects Completed",
    icon: "mdi:clipboard-check-outline",
    className: "projects",
  },
  {
    id: 2,
    number: "2+",
    label: "Years Experience",
    icon: "mdi:briefcase-outline",
    className: "experience",
  },
  {
    id: 3,
    number: "10+",
    label: "Technologies",
    icon: "ant-design:code-twotone",
    className: "technologies",
  },
];

export default function StatsCards() {
  return (
   <>
   {statsData.map((item) => (
        <div key={item.id}>
          <Card className={`stat-card ${item.className}`}>
            <div className="stat-content">
              <Typography variant="h4" className="stat-number">
                {item.number}
              </Typography>
              <Typography variant="body1" className="stat-label">
                {item.label}
              </Typography>
            </div>
            <Icon icon={item.icon} className="stat-bg-icon" />
          </Card>
        </div>
      ))}
   </>
  );
}
