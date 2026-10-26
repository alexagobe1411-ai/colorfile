
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class FormularioComponent {

  nombre = signal('');
  correo = signal('');
  mensaje = signal('');

  enviado = signal(false);

  enviarFormulario() {
    if (
      this.nombre().trim() !== '' &&
      this.correo().trim() !== '' &&
      this.mensaje().trim() !== ''
    ) {
      this.enviado.set(true);
    }
  }

}
