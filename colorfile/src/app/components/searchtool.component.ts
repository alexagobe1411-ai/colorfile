import { Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ColorItem, ColorService } from '../services/color.service';

@Component({
  selector: 'app-searchtool',
  standalone: true,
  template: `
    <section class="search-panel" aria-labelledby="hex-search-title">
      <label id="hex-search-title" for="hex-search-input">Buscar un color por HEX</label>
      <div class="search-controls">
        <input
          id="hex-search-input"
          #hexInput
          type="text"
          placeholder="#A1B2C3"
          maxlength="7"
          autocomplete="off"
          spellcheck="false"
          (keydown.enter)="searchColor(hexInput.value)"
        >
        <button
          class="search-button"
          type="button"
          [disabled]="isSearching()"
          (click)="searchColor(hexInput.value)"
        >
          {{ isSearching() ? 'Buscando…' : 'Buscar' }}
        </button>
      </div>

      <p class="search-message" aria-live="polite">
        @if (searchError()) {
          {{ searchError() }}
        }
      </p>

      @if (searchResult(); as result) {
        <div class="search-result" aria-live="polite">
          <span class="search-swatch" [style.background-color]="result.hex"></span>
          <span>{{ result.name }}</span>
          <strong>{{ result.hex }}</strong>
        </div>
      }
    </section>
  `,
  styles: [`
    :host {
      position: relative;
      z-index: 1;
      display: block;
    }

    .search-panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-family: sans-serif;
    }

    .search-panel > label {
      font-weight: bold;
    }

    .search-controls {
      display: flex;
      gap: 8px;
    }

    .search-controls input {
      width: 180px;
      padding: 10px 14px;
      border: 1px solid #aaa;
      border-radius: 999px;
      background: #fff;
      color: #000;
      font: inherit;
    }

    .search-button {
      padding: 10px 20px;
      border: none;
      border-radius: 999px;
      background: #fff;
      color: #000;
      font: inherit;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .search-button:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
    }

    .search-button:disabled {
      cursor: wait;
      opacity: 0.7;
    }

    .search-message {
      min-height: 1em;
      margin: 0;
      color: #9b1c1c;
      font-size: 0.9rem;
      text-align: center;
    }

    .search-result {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.9);
    }

    .search-swatch {
      width: 24px;
      height: 24px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 50%;
    }
  `]
})
export class SearchToolComponent {
  private colorService = inject(ColorService);

  searchResult = signal<ColorItem | null>(null);
  searchError = signal<string | null>(null);
  isSearching = signal(false);

  async searchColor(value: string): Promise<void> {
    const hex = value.trim().replace(/^#/, '');
    this.searchResult.set(null);
    this.searchError.set(null);

    if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
      this.searchError.set('Escribe un código HEX válido de 6 caracteres, por ejemplo #A1B2C3.');
      return;
    }

    this.isSearching.set(true);
    try {
      const color = await firstValueFrom(this.colorService.getColorByHex(hex));
      this.searchResult.set(color);
    } catch {
      this.searchError.set('No se pudo consultar el color. Inténtalo de nuevo.');
    } finally {
      this.isSearching.set(false);
    }
  }
}
