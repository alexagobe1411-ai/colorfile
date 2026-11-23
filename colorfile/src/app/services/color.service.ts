import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ColorItem {
  hex: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.thecolorapi.com';
  private myBackendUrl = 'http://localhost:3000';

  private getRandomHex(): string {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  getHelloWorld() {
    
  }

  // Obtiene 5 colores de la API
  getPalette(): Observable<ColorItem[]> {
    const seed = this.getRandomHex();
    return this.http.get<any>(`${this.apiUrl}/scheme?hex=${seed}&mode=monochrome&count=5`).pipe(
      map(res => res.colors.map((c: any) => ({
        hex: c.hex.value,
        name: c.name.value
      })))
    );
  }

  // Obtiene un solo color
  getSingleColor(): Observable<ColorItem> {
    const hex = this.getRandomHex();
    return this.http.get<any>(`${this.apiUrl}/id?hex=${hex}`).pipe(
      map(res => ({
        hex: res.hex.value,
        name: res.name.value
      }))
    );
  }

  // Metodo para el bucador de hex 
  getColorByHex(hex: string): Observable<ColorItem> {
    const normalizedHex = hex.trim().replace(/^#/, '');

    return this.http.get<any>(`${this.apiUrl}/id?hex=${encodeURIComponent(normalizedHex)}`).pipe(
      map(res => ({
        hex: res.hex.value,
        name: res.name.value
      }))
    );
  }
}
