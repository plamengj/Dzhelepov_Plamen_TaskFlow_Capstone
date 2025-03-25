import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Paper,
    Typography,
    Box,
    Alert,
    CircularProgress,
} from '@mui/material';
import { googleLogin } from '../../redux/slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleGoogleResponse = useCallback(async (response) => {
        try {
            await dispatch(googleLogin(response.credential));
        } catch (error) {
            console.error('Google login error:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                window.google.accounts.id.initialize({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                    context: 'signin'
                });
                window.google.accounts.id.renderButton(
                    document.getElementById('googleSignInDiv'),
                    { theme: 'outline', size: 'large', width: '100%' }
                );
            };
            script.onerror = () => {
                console.error('Failed to load Google Sign-In script');
            };
            document.body.appendChild(script);
        };

        if (!window.google) {
            loadGoogleScript();
        }

        return () => {
            const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, [handleGoogleResponse]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Welcome to Task Manager
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
                        Please sign in to continue
                    </Typography>
                    
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Box sx={{ width: '100%', maxWidth: 300 }}>
                                <div id="googleSignInDiv"></div>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login; 