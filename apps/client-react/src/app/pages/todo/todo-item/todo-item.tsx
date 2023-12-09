import { ITodoPartial } from '@northvolt/shared';

interface TodoItemParams {
  data: ITodoPartial;
  onDoneHandler: (id: string) => void;
  onDeleteHandler: (id: string) => void;
}

export default function TodoItem({ data, onDoneHandler, onDeleteHandler }: TodoItemParams) {
  return (
    <li>
      <span>{data.text}</span>
      <button className="ml-sm" onClick={() => onDoneHandler(data.id as string)} disabled={data.done}>
        Done
      </button>
      <button className="ml-sm" onClick={() => onDeleteHandler(data.id as string)}>
        Delete
      </button>
      {data.done && <span className="ml-sm">{new Date(data.doneAt as unknown as string)?.toLocaleString()}</span>}
    </li>
  );
}
