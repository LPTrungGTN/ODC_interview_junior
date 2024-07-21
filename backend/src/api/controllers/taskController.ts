import { Request, Response } from 'express';

import { TaskService } from '@/api/services/taskService';

export class TaskController {
  private service: TaskService;

  constructor(taskService: TaskService) {
    this.service = taskService;
  }

  public async index(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.service.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || 'Internal Server Error' });
    }
  }

  public async show(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.service.getTaskById(req);
      res.json(tasks);
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || 'Internal Server Error' });
    }
  }

  public async store(req: Request, res: Response): Promise<void> {
    try {
      await this.service.addTask(req);
      res.status(201).end();
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || 'Internal Server Error' });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      await this.service.updateTask(req);
      res.status(200).end();
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || 'Internal Server Error' });
    }
  }

  public async destroy(req: Request, res: Response): Promise<void> {
    try {
      await this.service.deleteTaskById(req);
      res.status(204).end();
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .send({ message: error.message || 'Internal Server Error' });
    }
  }
}
