import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Avatar,
    Alert,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/slices/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const [profileSuccess, setProfileSuccess] = useState(false);

    const handleProfileChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(updateProfile(profileData));
        if (result.payload && !result.error) {
            setProfileSuccess(true);
            setTimeout(() => setProfileSuccess(false), 5000);
        }
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 80, height: 80 }}>
                        <PersonIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h4" gutterBottom>
                        Profile
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {profileSuccess && (
                        <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                            Profile updated successfully!
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleProfileSubmit} sx={{ width: '100%', mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Personal Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleProfileChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Update Profile'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Profile; 