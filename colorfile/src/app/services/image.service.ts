import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface PicsumImage {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private http = inject(HttpClient);
  private apiUrl = 'https://picsum.photos/v2/list';

  // Obtiene cinco imágenes de una página aleatoria de Picsum.
  getImages(): Observable<string[]> {
    const page = Math.floor(Math.random() * 50) + 1;

    return this.http.get<PicsumImage[]>(`${this.apiUrl}?page=${page}&limit=5`).pipe(
      map(list => list.map(image => `https://picsum.photos/id/${image.id}/300/300`))
    );
  }
}
