import { Request, Response } from 'express';

import { AppDataSource } from '@/config/data-source';
import { Task } from '@/entity/task';

export const store = async (req: Request, res: Response) => {
  const taskRepository = AppDataSource.getRepository(Task);
  try {
    const task = taskRepository.create(req.body);
    await taskRepository.save(task);
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send('Error creating a new task');
  }
};

export const index = async (req: Request, res: Response) => {
  const taskRepository = AppDataSource.getRepository(Task);
  try {
    const tasks = await taskRepository.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send('Error retrieving tasks');
  }
};