import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Paper
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';

const Settings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Abaya Store',
    storeDescription: 'Premium Women\'s Abayas in Pakistan',
    contactEmail: 'contact@abayastore.com',
    phone: '+92-300-1234567',
    address: 'Karachi, Pakistan',
  });

  const [apiSettings, setApiSettings] = useState({
    shopifyApiKey: '',
    shopifyPassword: '',
    shopifyDomain: 'your-store.myshopify.com',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderAlerts: true,
    stockAlerts: true,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleStoreSettingsChange = (field) => (event) => {
    setStoreSettings({
      ...storeSettings,
      [field]: event.target.value
    });
  };

  const handleApiSettingsChange = (field) => (event) => {
    setApiSettings({
      ...apiSettings,
      [field]: event.target.value
    });
  };

  const handleNotificationChange = (field) => (event) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: event.target.checked
    });
  };

  const handleSaveStoreSettings = () => {
    // Save store settings logic here
    enqueueSnackbar('Store settings saved successfully', { variant: 'success' });
  };

  const handleSaveApiSettings = () => {
    // Save API settings logic here
    enqueueSnackbar('API settings saved successfully', { variant: 'success' });
  };

  const handleSaveNotificationSettings = () => {
    // Save notification settings logic here
    enqueueSnackbar('Notification settings saved successfully', { variant: 'success' });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Store Information */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Icon icon="material-symbols:store" style={{ marginRight: 16, color: '#8E24AA' }} />
                <Typography variant="h6">Store Information</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Store Name"
                    value={storeSettings.storeName}
                    onChange={handleStoreSettingsChange('storeName')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Store Description"
                    value={storeSettings.storeDescription}
                    onChange={handleStoreSettingsChange('storeDescription')}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    type="email"
                    value={storeSettings.contactEmail}
                    onChange={handleStoreSettingsChange('contactEmail')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={storeSettings.phone}
                    onChange={handleStoreSettingsChange('phone')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={storeSettings.address}
                    onChange={handleStoreSettingsChange('address')}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleSaveStoreSettings}
                    fullWidth
                  >
                    Save Store Settings
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* API Configuration */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Icon icon="material-symbols:security" style={{ marginRight: 16, color: '#8E24AA' }} />
                <Typography variant="h6">Shopify API Configuration</Typography>
              </Box>

              <Alert severity="info" sx={{ mb: 3 }}>
                Shopify API integration is currently disabled for demo purposes.
              </Alert>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Shopify Domain"
                    value={apiSettings.shopifyDomain}
                    onChange={handleApiSettingsChange('shopifyDomain')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="API Key"
                    type="password"
                    value={apiSettings.shopifyApiKey}
                    onChange={handleApiSettingsChange('shopifyApiKey')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="API Password"
                    type="password"
                    value={apiSettings.shopifyPassword}
                    onChange={handleApiSettingsChange('shopifyPassword')}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleSaveApiSettings}
                    fullWidth
                    disabled
                  >
                    Save API Settings
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Icon icon="material-symbols:notifications" style={{ marginRight: 16, color: '#8E24AA' }} />
                <Typography variant="h6">Notification Preferences</Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Communication
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onChange={handleNotificationChange('emailNotifications')}
                        />
                      }
                      label="Email Notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.smsNotifications}
                          onChange={handleNotificationChange('smsNotifications')}
                        />
                      }
                      label="SMS Notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.pushNotifications}
                          onChange={handleNotificationChange('pushNotifications')}
                        />
                      }
                      label="Push Notifications"
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Alerts
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.orderAlerts}
                          onChange={handleNotificationChange('orderAlerts')}
                        />
                      }
                      label="New Order Alerts"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.stockAlerts}
                          onChange={handleNotificationChange('stockAlerts')}
                        />
                      }
                      label="Low Stock Alerts"
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleSaveNotificationSettings}
                    sx={{ mt: 2 }}
                  >
                    Save Notification Settings
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;