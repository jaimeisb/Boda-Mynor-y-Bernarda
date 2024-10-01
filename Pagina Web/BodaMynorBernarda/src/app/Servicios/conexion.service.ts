import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invitacion {
  idInvitacion: number;
  idEvento: number;
  nombre: string;
  adultos: number;
  menores: number;
  fechaExpiracion: Date;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private apiUrl = 'https://localhost:7080/api/Invitacion';  // URL base de la API
  constructor(private http: HttpClient) { }

  // Método para obtener una invitación por ID
  getInvitacion(id: number): Observable<Invitacion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Invitacion>(url);
  }

  confirmarInvitacion(id: number, confirmacion: any): Observable<any> {
    const url = `${this.apiUrl}/${id}/confirmar`;
    return this.http.post<any>(url, confirmacion, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
}
