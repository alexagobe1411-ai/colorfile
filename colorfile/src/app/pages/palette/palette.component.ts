import {Component, inject, signal} from '@angular/core';
import { ColorItem, ColorService } from '../../services/color.service';
import { ImageService } from '../../services/image.service';
import { TriangleComponent } from '../../components/triangle.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, startWith, Subject, switchMap } from 'rxjs';
import{RouterLink} from '@angular/router';



@Component({
  selector: 'app-palette',
  standalone: true,
  imports: [RouterLink, TriangleComponent],
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})

export class PaletteComponent {
  colorService = inject(ColorService);
  private imageService = inject(ImageService);
  copiedHex = signal<string | null>(null);
  searchResult = signal<ColorItem | null>(null);
  searchError = signal<string | null>(null);
  isSearching = signal(false);

  private reload$ = new Subject<void>();

  // Al recargar, obtiene otra paleta.
  colors = toSignal(
    this.reload$.pipe(
      startWith(undefined),
      switchMap(() => this.colorService.getPalette())
    ),
    { initialValue: null }
  );

  // Al recargar, obtiene cinco imágenes nuevas.
  images = toSignal(
    this.reload$.pipe(
      startWith(undefined),
      switchMap(() => this.imageService.getImages())
    ),
    { initialValue: null }
  );

  reloadPalette(): void {
    this.reload$.next();
  }



  // Searching logics  text input
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

  async copyColor(hex: string): Promise<void> {
    await navigator.clipboard.writeText(hex);
    this.copiedHex.set(hex);
  }
}
