import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {

  private listUrl = 'https://pt.gda.one/api/tests/v1/shipments/list';
  private statusUrl = 'https://pt.gda.one/api/tests/v1/shipments/status';

  constructor(private http: HttpClient) { }

  getShipments(): Observable<any> {
    return this.http.get<any>(this.listUrl);
  }

  updateShipmentStatus(newStatus: string): Observable<any> {
    return this.http.post<any>(this.statusUrl, { status: newStatus });
  }
}
