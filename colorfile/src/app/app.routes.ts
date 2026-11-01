import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaletteComponent } from './pages/palette/palette.component';

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
    path: '**',
    redirectTo: ''
  }
];
