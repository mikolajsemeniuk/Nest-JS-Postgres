import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.status";


@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    description: string = ''

    @Column()
    done: boolean = false

    @Column()
    status: TaskStatus = TaskStatus.IN_PROGRESS

    @Column()
    createdAt: Date = new Date()
}