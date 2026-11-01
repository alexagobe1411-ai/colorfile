import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="site-footer">
      <strong>Colorfile </strong>
      <span>Generador de paletas para encontrar tus colors .</span>
      <small>
        Imágenes de
        <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer">
          Picsum Photos
        </a>
      </small>
    </footer>
  `,
  styles: [`
    .site-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      padding: 20px;
      background: #faf9f6;
      color: #333;
      font-family: sans-serif;
    }

    .site-footer a {
      color: inherit;
    }
  `]
})
export class FooterComponent {}
