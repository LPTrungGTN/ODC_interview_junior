import { Router } from 'express';

import { TaskController } from '@/api/controllers/taskController';
import { TaskRepository } from '@/api/repositories/taskRepository';
import { TaskService } from '@/api/services/taskService';

const router = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const index = taskController.index.bind(taskController);
const store = taskController.store.bind(taskController);

router.get('/', index);
// router.get('/:id', taskController.showTask.bind(taskController));
router.post('/', store);
// router.patch('/:id', taskController.updateTask.bind(taskController));
// router.delete('/:id', taskController.deleteTask.bind(taskController));

export default router;
