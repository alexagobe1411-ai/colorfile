import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaletteComponent } from './pages/palette/palette.component';
import { FormularioComponent } from './pages/formulario/formulario';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'palette',
    component: PaletteComponent
  },
  {
    path: 'formulario',
    component: FormularioComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
