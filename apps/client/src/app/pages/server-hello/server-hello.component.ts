import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'northvolt-server-hello',
  standalone: true,
  imports: [HttpClientModule, AsyncPipe, JsonPipe],
  templateUrl: './server-hello.component.html',
})
export class ServerHelloComponent {
  private readonly httpClient = inject(HttpClient);

  public sayHello$ = this.httpClient.get('/api');
}
