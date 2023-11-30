import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ITodo } from '@northvolt/shared';
import { Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'northvolt-todo',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, HttpClientModule, DatePipe],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements AfterViewInit {
  private readonly httpClient = inject(HttpClient);

  @ViewChild('todoInput')
  todoInput!: ElementRef<HTMLInputElement>;

  load$: Subject<void> = new Subject<void>();
  todoList$: Observable<ITodo[]> = this.load$.pipe(switchMap(() => this.httpClient.get<ITodo[]>('/api/todo')));

  ngAfterViewInit(): void {
    this.load$.next();
  }

  onAddTodo(): void {
    const value = this.todoInput.nativeElement.value;
    if (!value.length) return;

    this.httpClient.post('/api/todo', { text: value, done: false }).subscribe({
      next: () => {
        this.load$.next();
        this.todoInput.nativeElement.value = '';
      },
      error: error => console.error(error),
    });
  }

  onDone(id: string): void {
    this.httpClient.patch(`/api/todo/${id}`, { done: true }).subscribe({
      next: () => this.load$.next(),
      error: error => console.error(error),
    });
  }

  onDelete(id: string): void {
    this.httpClient.delete(`/api/todo/${id}`).subscribe({
      next: () => this.load$.next(),
      error: error => console.error(error),
    });
  }
}
