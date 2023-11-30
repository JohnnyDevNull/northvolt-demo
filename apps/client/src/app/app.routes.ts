import { Route } from '@angular/router';
import { ServerHelloComponent } from './pages/server-hello/server-hello.component';
import { TodoComponent } from './pages/todo/todo.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/server-hello' },
  { path: 'server-hello', component: ServerHelloComponent },
  { path: 'todo', component: TodoComponent },
];
