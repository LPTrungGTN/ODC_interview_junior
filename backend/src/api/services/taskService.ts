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

  public async addTask(data: any): Promise<void> {
    await this.repository.add(data);
  }
}
