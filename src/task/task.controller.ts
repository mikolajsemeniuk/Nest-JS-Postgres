import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Task } from "./task.entity";
import { TaskInput } from "./task.input";
import { TaskService } from "./task.service";

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    getTasks(): Promise<Task[]> {
        return this.taskService.getTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id)
    }

    @Post()
    addTask(@Body() input: TaskInput): Promise<Task> {
        return this.taskService.addTask(input)
    }

    @Delete('/:id')
    removeTask(@Param('id') id: string): Promise<void> {
        return this.taskService.removeTask(id)
    }

    @Patch('/:id')
    deleteTask(@Param('id') id: string, @Body() input: TaskInput): Promise<Task> {
        return this.taskService.updateTask(id, input.title)
    }
}