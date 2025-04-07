// src/app/services/soutenance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Soutenance } from '../models/soutenance.model';

@Injectable({
  providedIn: 'root', // Service is provided at the root level
})
export class SoutenanceService {
  private apiUrl = 'http://localhost:8080/soutenances'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all soutenances
  getAllSoutenances(): Observable<Soutenance[]> {
    return this.http.get<Soutenance[]>(this.apiUrl);
  }

  // Get soutenance by ID
  getSoutenanceById(id: number): Observable<Soutenance> {
    return this.http.get<Soutenance>(`${this.apiUrl}/${id}`);
  }

  // Create a new soutenance
  createSoutenance(soutenance: Soutenance): Observable<Soutenance> {
    return this.http.post<Soutenance>(this.apiUrl, soutenance);
  }

  // Update a soutenance
  updateSoutenance(id: number, soutenance: Soutenance): Observable<Soutenance> {
    return this.http.put<Soutenance>(`${this.apiUrl}/${id}`, soutenance);
  }

  // Delete a soutenance
  deleteSoutenance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Delete all soutenances
  deleteAllSoutenances(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}