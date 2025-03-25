import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import theme from './theme';

// Components
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import TaskDetail from './components/tasks/TaskDetail';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import NotFound from './components/common/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Navbar />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />

                        {/* Protected Routes */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/tasks"
                            element={
                                <ProtectedRoute>
                                    <TaskList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/tasks/new"
                            element={
                                <ProtectedRoute>
                                    <TaskForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/tasks/:id"
                            element={
                                <ProtectedRoute>
                                    <TaskDetail />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/tasks/:id/edit"
                            element={
                                <ProtectedRoute>
                                    <TaskForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        {/* 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
