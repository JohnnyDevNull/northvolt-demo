import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  standalone: true,
  imports: [RouterModule, MenuComponent],
  selector: 'northvolt-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}
