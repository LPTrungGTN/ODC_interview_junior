import { Task } from '@/api/entity/task';
import { AppDataSource } from '@/common/config/data-source';

export class TaskRepository {
  private db = AppDataSource.getRepository(Task);

  public async findAll(): Promise<Task[]> {
    return await this.db.find();
  }

  public async findById(id: number): Promise<Task> {
    return await this.db.findOne({
      where: { id },
    });
  }

  public async updateById(taskData: Task, id: number): Promise<void> {
    await this.db.update(id, taskData);
  }

  public async add(taskData: Task): Promise<void> {
    await this.db.save(taskData);
  }

  public async removeById(id: number): Promise<void> {
    await this.db.delete(id);
  }
}
