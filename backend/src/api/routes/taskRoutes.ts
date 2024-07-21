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
const show = taskController.show.bind(taskController);
const update = taskController.update.bind(taskController);
const destroy = taskController.destroy.bind(taskController);

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.patch('/:id', update);
router.delete('/:id', destroy);

export default router;
