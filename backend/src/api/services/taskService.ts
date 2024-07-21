import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';

import { Task } from '@/api/entity/task';
import { TaskRepository } from '@/api/repositories/taskRepository';
import { BadRequestException } from '@/common/exceptions/badRequestException';
import { NotFoundException } from '@/common/exceptions/notFoundException';

export class TaskService {
  private repository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.repository = taskRepository;
  }

  public async getAllTasks(): Promise<Task[]> {
    return await this.repository.findAll();
  }

  public async getTaskById(req: Request): Promise<Task> {
    const id = this.validateId(req);

    return await this.repository.findById(id);
  }

  public async addTask(req: Request): Promise<void> {
    const task = plainToClass(Task, req.body);

    const errors = await validate(task);
    console.log(errors);
    if (errors.length > 0) throw new BadRequestException();

    await this.repository.add(task);
  }

  public async updateTask(req: Request): Promise<void> {
    const id = this.validateId(req);

    const existingTask = await this.repository.findById(id);
    if (!existingTask) throw new NotFoundException();

    const updatedTask = plainToClass(Task, { ...existingTask, ...req.body });
    console.log(updatedTask);
    const errors = await validate(updatedTask);
    if (errors.length > 0) throw new BadRequestException();

    await this.repository.updateById(updatedTask, id);
  }

  public async deleteTaskById(req: Request): Promise<void> {
    const id = this.validateId(req);

    const task = await this.repository.findById(id);
    if (!task) throw new NotFoundException();

    await this.repository.removeById(id);
  }

  private validateId(req: Request) {
    const {
      params: { id },
    } = req;
    if (!id || typeof id !== 'number') throw new BadRequestException();
    return id;
  }
}
