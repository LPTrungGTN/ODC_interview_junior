import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { Task } from '@/api/entity/task';
import { TaskRepository } from '@/api/repositories/taskRepository';

export class TaskService {
  private repository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.repository = taskRepository;
  }

  public async getAllTasks(): Promise<Task[]> {
    return await this.repository.findAll();
  }

  public async addTask(req: Request): Promise<void> {
    const task = plainToClass(Task, req.body);

    const errors = await validate(task);
    if (errors.length > 0) throw createHttpError(400, 'Bad Request');

    await this.repository.add(task);
  }
}
