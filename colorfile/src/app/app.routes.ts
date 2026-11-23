import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaletteComponent } from './pages/palette/palette.component';
import { LoginComponent } from './pages/login/login.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

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
    path: 'login',
    component: LoginComponent
  },
   {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
