import {Component, inject} from '@angular/core';
import { ColorService } from '../../services/color.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-palette',
  standalone: true,
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})

export class PaletteComponent {
  colorService = inject(ColorService);

  colors = toSignal(this.colorService.getPalette());
}