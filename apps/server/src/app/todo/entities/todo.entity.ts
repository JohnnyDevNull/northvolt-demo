import { ITodo } from '@northvolt/shared';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo implements ITodo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  doneAt: Date;
}
