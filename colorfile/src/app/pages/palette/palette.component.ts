import { Component, inject, signal } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { ImageService } from '../../services/image.service';
import { TriangleComponent } from '../../components/triangle/triangle.component';
import { SearchToolComponent } from '../../components/searchtool.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith, Subject, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-palette',
  standalone: true,
  imports: [RouterLink, TriangleComponent, SearchToolComponent],
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent {
  colorService = inject(ColorService);
  private imageService = inject(ImageService);
  readonly placeholders = [1, 2, 3, 4, 5];
  copiedHex = signal<string | null>(null);

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

  // Copy color to clipboard
  async copyColor(hex: string): Promise<void> {
    await navigator.clipboard.writeText(hex);
    this.copiedHex.set(hex);
  }
}
