import {Component, inject} from '@angular/core';
import { ColorService } from '../../services/color.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-palette',
  standalone: true,
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})

export class PaletteComponent {
  colorService = inject(ColorService);
  private http = inject(HttpClient);
  
//para establecer los colores 
  colors = toSignal(this.colorService.getPalette());

// para establecer imagenes de api
  images = toSignal(
    this.http.get<any[]>(`https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 50) + 1}&limit=5`).pipe(
      map(list => list.map(img => `https://picsum.photos/id/${img.id}/300/300`))
    )
  );
}
