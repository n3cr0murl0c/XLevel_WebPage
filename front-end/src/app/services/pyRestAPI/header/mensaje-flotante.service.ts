import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MensajeFlotanteService {

  constructor(private http: HttpClient) { }
}
