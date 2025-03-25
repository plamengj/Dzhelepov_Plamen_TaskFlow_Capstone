import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    Box,
    IconButton,
    Tooltip,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTasks,
    deleteTask,
    setSelectedTask,
} from '../../redux/slices/taskSlice';

const TaskList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tasks, loading, error } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleEdit = (task) => {
        dispatch(setSelectedTask(task));
        navigate(`/tasks/${task._id}/edit`);
    };

    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(taskId));
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
                return 'info';
            default:
                return 'default';
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                }}
            >
                <Typography variant="h4" component="h1">
                    My Tasks
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/tasks/new')}
                >
                    New Task
                </Button>
            </Box>

            <Grid container spacing={3}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="h2" gutterBottom>
                                    {task.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    paragraph
                                >
                                    {task.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                    <Chip
                                        label={task.priority}
                                        color={getPriorityColor(task.priority)}
                                        size="small"
                                    />
                                    <Chip
                                        label={task.status}
                                        color={getStatusColor(task.status)}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Tooltip title="Edit">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleEdit(task)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={task.status === 'completed' ? 'Mark as Incomplete' : 'Mark as Complete'}>
                                    <IconButton
                                        size="small"
                                        color={task.status === 'completed' ? 'error' : 'success'}
                                        onClick={() => handleEdit({
                                            ...task,
                                            status: task.status === 'completed' ? 'pending' : 'completed'
                                        })}
                                    >
                                        {task.status === 'completed' ? <CancelIcon /> : <CheckCircleIcon />}
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TaskList; 