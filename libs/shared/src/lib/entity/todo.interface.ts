export interface ITodo {
  id: string;
  text: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  doneAt: Date;
}

export type ITodoPartial = Partial<ITodo>;
