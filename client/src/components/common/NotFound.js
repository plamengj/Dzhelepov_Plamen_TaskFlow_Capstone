import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

const NotFound = () => {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h1" component="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    The page you are looking for doesn't exist or has been moved.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound; 