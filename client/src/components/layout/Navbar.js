import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Assignment as TaskIcon,
    Add as AddIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { logout } from '../../redux/slices/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    };

    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleLogout = async () => {
        handleUserMenuClose();
        await dispatch(logout());
        navigate('/login');
    };

    const handleProfile = () => {
        handleUserMenuClose();
        navigate('/profile');
    };

    const NavLinks = () => (
        <>
            <Button
                color="inherit"
                startIcon={<DashboardIcon />}
                onClick={() => navigate('/')}
            >
                Dashboard
            </Button>
            <Button
                color="inherit"
                startIcon={<TaskIcon />}
                onClick={() => navigate('/tasks')}
            >
                Tasks
            </Button>
            <Button
                color="inherit"
                startIcon={<AddIcon />}
                onClick={() => navigate('/tasks/new')}
            >
                New Task
            </Button>
        </>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Task Manager
                </Typography>

                {isAuthenticated ? (
                    <>
                        {isMobile ? (
                            <>
                                <IconButton
                                    color="inherit"
                                    onClick={handleMobileMenuOpen}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={mobileMenuAnchor}
                                    open={Boolean(mobileMenuAnchor)}
                                    onClose={handleMobileMenuClose}
                                >
                                    <MenuItem onClick={() => { navigate('/'); handleMobileMenuClose(); }}>
                                        Dashboard
                                    </MenuItem>
                                    <MenuItem onClick={() => { navigate('/tasks'); handleMobileMenuClose(); }}>
                                        Tasks
                                    </MenuItem>
                                    <MenuItem onClick={() => { navigate('/tasks/new'); handleMobileMenuClose(); }}>
                                        New Task
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <NavLinks />
                        )}

                        <Box sx={{ ml: 2 }}>
                            <IconButton
                                color="inherit"
                                onClick={handleUserMenuOpen}
                            >
                                <PersonIcon />
                            </IconButton>
                            <Menu
                                anchorEl={userMenuAnchor}
                                open={Boolean(userMenuAnchor)}
                                onClose={handleUserMenuClose}
                            >
                                <MenuItem onClick={handleProfile}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </>
                ) : (
                    <Button
                        color="inherit"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 