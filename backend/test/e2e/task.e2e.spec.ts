import { Server } from 'http';
import request from 'supertest';
import { Repository } from 'typeorm';

import { Task } from '@/api/entity/task';
import app from '@/app';
import { AppDataSource } from '@/common/config/data-source';

describe('Task E2E', () => {
  let server: Server;
  let db: Repository<Task>;
  let tasks: Task[];
  const baseUrl = '/api/tasks';
  let task1Url: string;

  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      server = app.listen(3003, async () => {
        try {
          await AppDataSource.initialize();
          db = AppDataSource.getRepository(Task);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    });
  });

  beforeEach(async () => {
    tasks = [
      db.create({
        endDate: '2024-07-10',
        name: 'Task 1',
        startDate: '2024-07-01',
      }),
      db.create({
        endDate: '2024-07-20',
        name: 'Task 2',
        startDate: '2024-07-11',
      }),
      db.create({
        endDate: '2024-07-30',
        name: 'Task 3',
        startDate: '2024-07-21',
      }),
    ];
    await db.save(tasks);
    task1Url = baseUrl + '/' + tasks[0].id;
  });

  afterEach(async () => {
    await db.createQueryBuilder().delete().from(Task).execute();
  });

  afterAll(async () => {
    if (server) {
      server.close();
    }
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  describe('store', () => {
    const task = {
      endDate: '2024-07-29',
      name: 'New Task',
      startDate: '2024-07-22',
    };
    it('should return 201 OK when creating a task', async () => {
      const res = await request(server).post(baseUrl).send(task);

      expect(res.status).toBe(201);
    });

    it('should return bad request', async () => {
      const res = await request(server).post(baseUrl).send({
        endDate: 'asda',
        name: 'fail',
        startDate: '2024-07-22',
      });
      const { body, status } = res;

      expect(status).toBe(400);
      expect(body).toEqual({ message: 'Bad Request' });
    });

    it('should handle errors and return 500 status code', async () => {
      jest
        .spyOn(db, 'save')
        .mockImplementation(() => Promise.reject(new Error()));
      const res = await request(server).post(baseUrl).send(task);
      const { body, status } = res;

      expect(status).toBe(500);
      expect(body).toEqual({ message: 'Internal Server Error' });
      jest.restoreAllMocks();
    });
  });

  describe('index', () => {
    it('should return 200', async () => {
      const res = await request(server).get(baseUrl);
      const { body, status } = res;

      expect(status).toBe(200);
      expect(body).toEqual(tasks);
    });

    it('should handle errors and return 500 status code', async () => {
      jest
        .spyOn(db, 'find')
        .mockImplementation(() => Promise.reject(new Error()));

      const res = await request(app).get(baseUrl);
      const { body, status } = res;

      expect(status).toBe(500);
      expect(body).toEqual({ message: 'Internal Server Error' });
      jest.restoreAllMocks();
    });
  });

  describe('show', () => {
    it('should return 200', async () => {
      const res = await request(server).get(task1Url);
      const { body, status } = res;

      expect(status).toBe(200);
      expect(body).toEqual(tasks[0]);
    });

    it('should return 400', async () => {
      const res = await request(server).get(baseUrl + '/fail');
      const { body, status } = res;

      expect(status).toBe(400);
      expect(body).toEqual({ message: 'Bad Request' });
    });

    it('should handle errors and return 500 status code', async () => {
      jest
        .spyOn(db, 'findOne')
        .mockImplementation(() => Promise.reject(new Error()));

      const res = await request(server).get(task1Url);
      const { body, status } = res;

      expect(status).toBe(500);
      expect(body).toEqual({ message: 'Internal Server Error' });
      jest.restoreAllMocks();
    });
  });

  describe('update', () => {
    const task = {
      endDate: '2024-07-29',
      name: 'Update Task',
      startDate: '2024-07-22',
    };
    it('should return 200', async () => {
      const res = await request(server).patch(task1Url).send(task);

      expect(res.status).toBe(200);

      const taskUpdated = await db.findOne({
        where: {
          id: tasks[0].id,
        },
      });

      expect(taskUpdated.endDate).toBe(task.endDate);
      expect(taskUpdated.name).toBe(task.name);
      expect(taskUpdated.startDate).toBe(task.startDate);
    });

    it('should return bad request', async () => {
      const res = await request(server).patch(task1Url).send({
        endDate: 'asda',
        name: 'fail',
        startDate: '2024-07-22',
      });
      const { body, status } = res;

      expect(status).toBe(400);
      expect(body).toEqual({ message: 'Bad Request' });
    });

    it('should return 404', async () => {
      const id = tasks[0].id + 99;
      const res = await request(server)
        .patch(baseUrl + '/' + id)
        .send(task);
      const { body, status } = res;

      expect(status).toBe(404);
      expect(body).toEqual({ message: 'Not Found' });
    });

    it('should handle errors and return 500 status code', async () => {
      jest
        .spyOn(db, 'update')
        .mockImplementation(() => Promise.reject(new Error()));
      const res = await request(server).patch(task1Url).send(task);
      const { body, status } = res;

      expect(status).toBe(500);
      expect(body).toEqual({ message: 'Internal Server Error' });
      jest.restoreAllMocks();
    });
  });

  describe('delete', () => {
    it('should return 204', async () => {
      const res = await request(server).delete(task1Url);
      const { status } = res;

      expect(status).toBe(204);
      const task = await db.findOne({
        where: {
          id: tasks[0].id,
        },
      });

      expect(task).toBeNull();
    });

    it('should return 404', async () => {
      const id = tasks[0].id + 99;

      const res = await request(server).delete(baseUrl + '/' + id);
      const { body, status } = res;

      expect(status).toBe(404);
      expect(body).toEqual({ message: 'Not Found' });
    });

    it('should handle errors and return 500 status code', async () => {
      jest
        .spyOn(db, 'findOne')
        .mockImplementation(() => Promise.reject(new Error()));

      const res = await request(server).delete(task1Url);
      const { body, status } = res;

      expect(status).toBe(500);
      expect(body).toEqual({ message: 'Internal Server Error' });
      jest.restoreAllMocks();
    });
  });
});
