import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:8000/api/categorias'; // URL de la API de Laravel

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  ObtenerTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar una nueva categoría
  Agregar(categoria: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoria);
  }

  // Actualizar una categoría
  Actualizar(id: number, categoria: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, categoria);
  }

  // Eliminar una categoría
  Eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
