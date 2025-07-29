import React, { useState } from "react";

import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("admin@abayastore.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(email, password);
      if (result.success) {
        enqueueSnackbar("Login successful!", { variant: "success" });
        navigate("/dashboard");
      } else {
        setError(result.message);
        enqueueSnackbar("Login failed!", { variant: "error" });
      }
    } catch (err) {
      setError("An error occurred during login");
      enqueueSnackbar("An error occurred during login", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="login-container"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      {/* <Container maxWidth="sm">
     <Card></Card>
      </Container> */}
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-12 col-xs-10 col-md-8 col-lg-5">
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Box
                    className="gradient-bg"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",

                      mb: 2,
                    }}
                  >
                    <Icon
                      icon="material-symbols:store"
                      style={{ fontSize: 40, color: "white" }}
                    />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    Abaya Store Admin
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Sign in to manage your store
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="material-symbols:email" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon icon="material-symbols:lock" color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <Icon icon="material-symbols:visibility-off" />
                            ) : (
                              <Icon icon="material-symbols:visibility" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    className="gradient-bg"
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    loading={loading}
                    sx={{
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 1 }}
                  >
                    Demo Credentials:
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> admin@abayastore.com
                    <br />
                    <strong>Password:</strong> admin123
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Login;
