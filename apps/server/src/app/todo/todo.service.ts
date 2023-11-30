import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const entity = this.repo.create(createTodoDto);
    return await this.repo.save(entity);
  }

  findAll(): Promise<Todo[]> {
    return this.repo.find();
  }

  findOne(id: string): Promise<Todo> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const entity = await this.repo.findOneBy({ id });
    if (updateTodoDto.done) {
      entity.done = true;
      entity.doneAt = new Date();
    }
    this.repo.merge(entity, updateTodoDto);
    return this.repo.save(entity);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
