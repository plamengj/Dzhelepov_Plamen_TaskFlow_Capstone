import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Chip,
    Grid,
    Divider,
    Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTasks,
    deleteTask,
    clearSelectedTask,
} from '../../redux/slices/taskSlice';

const TaskDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tasks, selectedTask, loading, error } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
        
        return () => {
            dispatch(clearSelectedTask());
        };
    }, [dispatch]);

    // Find the task in the tasks array once they're loaded
    useEffect(() => {
        if (tasks.length > 0) {
            const task = tasks.find(task => task._id === id);
            if (task) {
                dispatch({ type: 'tasks/setSelectedTask', payload: task });
            }
        }
    }, [tasks, id, dispatch]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await dispatch(deleteTask(id));
            navigate('/tasks');
        }
    };

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

    if (loading) {
        return (
            <Container maxWidth="md">
                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Typography>Loading...</Typography>
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Box sx={{ mt: 8 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            </Container>
        );
    }

    if (!selectedTask) {
        return (
            <Container maxWidth="md">
                <Box sx={{ mt: 8 }}>
                    <Alert severity="info">Task not found</Alert>
                </Box>
            </Container>
        );
    }

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
                        width: '100%',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography component="h1" variant="h4">
                            {selectedTask.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate(`/tasks/${id}/edit`)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body1" paragraph>
                                {selectedTask.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Priority
                            </Typography>
                            <Chip
                                label={selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                                color={getPriorityColor(selectedTask.priority)}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Status
                            </Typography>
                            <Chip
                                label={selectedTask.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                color={getStatusColor(selectedTask.status)}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Due Date
                            </Typography>
                            <Typography variant="body1">
                                {new Date(selectedTask.dueDate).toLocaleDateString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Created At
                            </Typography>
                            <Typography variant="body1">
                                {new Date(selectedTask.createdAt).toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Last Updated
                            </Typography>
                            <Typography variant="body1">
                                {new Date(selectedTask.updatedAt).toLocaleString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
};

export default TaskDetail; 