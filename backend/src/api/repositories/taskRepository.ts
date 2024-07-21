import { Task } from '@/api/entity/task';
import { AppDataSource } from '@/common/config/data-source';

export class TaskRepository {
  private db = AppDataSource.getRepository(Task);

  public async findAll(): Promise<Task[]> {
    return await this.db.find();
  }

  public async add(taskData: Task): Promise<void> {
    await this.db.save(taskData);
  }
}
