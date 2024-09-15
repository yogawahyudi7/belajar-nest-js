import { IsNotEmpty, IsString } from 'class-validator';

export class RequestTaskDto {
  @IsNotEmpty()
  @IsString()
  task_name: string;

  @IsNotEmpty()
  @IsString()
  task_description: string;
}

export class ResponseTaskDto {
  id: number;
  task_name: string;
  task_description: string;
  created_at: Date;
  updated_at: Date;
}
