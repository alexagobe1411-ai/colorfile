import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './pages/home/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterOutlet, FooterComponent, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('colorfile');
}

