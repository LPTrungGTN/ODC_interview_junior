import { Router } from 'express';

import { TaskController } from '@/api/controllers/taskController';
import { TaskRepository } from '@/api/repositories/taskRepository';
import { TaskService } from '@/api/services/taskService';

const router = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const getAllTasksBound = taskController.getAllTasks.bind(taskController);
const addTaskBound = taskController.addTask.bind(taskController);

router.get('/', getAllTasksBound);
// router.get('/:id', taskController.showTask.bind(taskController));
router.post('/', addTaskBound);
// router.patch('/:id', taskController.updateTask.bind(taskController));
// router.delete('/:id', taskController.deleteTask.bind(taskController));

export default router;
