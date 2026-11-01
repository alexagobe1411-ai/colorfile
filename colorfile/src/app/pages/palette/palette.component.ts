import {Component, inject} from '@angular/core';
import { ColorService } from '../../services/color.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-palette',
  standalone: true,
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})

export class PaletteComponent {
  colorService = inject(ColorService);
  private http = inject(HttpClient);

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
      switchMap(() => this.http.get<any[]>(
        `https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 50) + 1}&limit=5`
      )),
      map(list => list.map(img => `https://picsum.photos/id/${img.id}/300/300`))
    ),
    { initialValue: null }
  );

  reloadPalette(): void {
    this.reload$.next();
  }
}
