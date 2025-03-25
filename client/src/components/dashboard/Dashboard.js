import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
    Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/slices/taskSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tasks, loading, error } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'error';
            case 'medium':
                return 'warning';
            case 'low':
                return 'success';
            default:
                return 'default';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'success';
            case 'in_progress':
                return 'warning';
            case 'pending':
                return 'default';
            default:
                return 'default';
        }
    };

    const statistics = {
        total: tasks.length,
        completed: tasks.filter((task) => task.status === 'completed').length,
        inProgress: tasks.filter((task) => task.status === 'in_progress').length,
        pending: tasks.filter((task) => task.status === 'pending').length,
        highPriority: tasks.filter((task) => task.priority === 'high').length,
        mediumPriority: tasks.filter((task) => task.priority === 'medium').length,
        lowPriority: tasks.filter((task) => task.priority === 'low').length,
    };

    const recentTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const upcomingTasks = [...tasks]
        .filter((task) => task.status !== 'completed')
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);

    if (loading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Typography>Loading...</Typography>
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ mt: 8 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography component="h1" variant="h4">
                        Dashboard
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/tasks/new')}
                    >
                        Create New Task
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {/* Statistics Cards */}
                    <Grid item xs={12} md={3}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Total Tasks
                            </Typography>
                            <Typography variant="h4">{statistics.total}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Completed
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {statistics.completed}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                In Progress
                            </Typography>
                            <Typography variant="h4" color="warning.main">
                                {statistics.inProgress}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Pending
                            </Typography>
                            <Typography variant="h4" color="text.secondary">
                                {statistics.pending}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Recent Tasks */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Recent Tasks
                            </Typography>
                            <List>
                                {recentTasks.map((task, index) => (
                                    <React.Fragment key={task._id}>
                                        <ListItem
                                            button
                                            onClick={() => navigate(`/tasks/${task._id}`)}
                                        >
                                            <ListItemText
                                                primary={task.title}
                                                secondary={
                                                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                                        <Chip
                                                            label={task.priority}
                                                            size="small"
                                                            color={getPriorityColor(task.priority)}
                                                        />
                                                        <Chip
                                                            label={task.status}
                                                            size="small"
                                                            color={getStatusColor(task.status)}
                                                        />
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        {index < recentTasks.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Upcoming Tasks */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Upcoming Tasks
                            </Typography>
                            <List>
                                {upcomingTasks.map((task, index) => (
                                    <React.Fragment key={task._id}>
                                        <ListItem
                                            button
                                            onClick={() => navigate(`/tasks/${task._id}`)}
                                        >
                                            <ListItemText
                                                primary={task.title}
                                                secondary={
                                                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                                        <Chip
                                                            label={task.priority}
                                                            size="small"
                                                            color={getPriorityColor(task.priority)}
                                                        />
                                                        <Chip
                                                            label={task.status}
                                                            size="small"
                                                            color={getStatusColor(task.status)}
                                                        />
                                                        <Typography variant="caption" color="text.secondary">
                                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        {index < upcomingTasks.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard; 