import { Request, Response } from 'express';

import { TaskService } from '@/api/services/taskService';

export class TaskController {
  private service: TaskService;

  constructor(taskService: TaskService) {
    this.service = taskService;
  }

  public async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasks = await this.service.getAllTasks();
    res.json(tasks);
  }

  public async addTask(req: Request, res: Response): Promise<void> {
    const taskData = req.body;
    await this.service.addTask(taskData);
    res.status(201).send({ message: 'add task success' });
  }
}
