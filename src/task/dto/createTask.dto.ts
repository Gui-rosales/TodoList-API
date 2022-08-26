export class CreateTaskDTO {
    id: number;
    title: string;
    description: string;
}

export class UpdateTaskDTO{
    title: string;
    description: string;
    responsibleId?: number;
}