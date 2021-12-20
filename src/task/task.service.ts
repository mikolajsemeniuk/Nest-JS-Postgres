import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { TaskInput } from "./task.input";
import { TaskRepository } from "./task.repository";
import { TaskStatus } from "./task.status";

@Injectable()
export class TaskService {
    
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}
    
    async getTasks(): Promise<Task[]> {
        // const query = this.taskRepository.createQueryBuilder('task')
        // condition ? query.addWhere('task.status = :status', { status: 'OPEN' })
        // condition ? query.addWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
        // await query.getMany()

        return await this.taskRepository.find();
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOne(id)

        if (!found) {
            throw new NotFoundException(`Task ${id} not found)`)
        }

        return found
    }

    async addTask(input: TaskInput): Promise<Task> {
        const { title } = input

        const task = this.taskRepository.create({
            title: title,
            description: '',
            done: false,
            status: TaskStatus.IN_PROGRESS,
            createdAt: new Date(),
        })

        await this.taskRepository.save(task);

        return task
    }

    async removeTask(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }

    async updateTask(id: string, title: string): Promise<Task> {
        const task = await this.getTaskById(id)
        task.title = title
        await this.taskRepository.save(task)
        return task
    }
}