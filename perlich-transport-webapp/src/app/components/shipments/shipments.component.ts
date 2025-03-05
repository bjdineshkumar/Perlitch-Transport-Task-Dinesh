import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShipmentsService } from '../../services/shipments.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-shipments',
  imports: [CommonModule, FormsModule],
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.css'
})

export class ShipmentsComponent implements OnInit {
  shipments: any[] = [];
  isAuthenticated = false;

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private shipmentsService: ShipmentsService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.authService.authStatus.subscribe(status => {
      if (status !== this.isAuthenticated) {
        this.isAuthenticated = status;
        this.loadShipments();
      }
    });
    this.isAuthenticated = this.authService.isLoggedIn();
    this.loadShipments();
  }

  loadShipments(): void {
    let endpoint = '';
    let headers = new HttpHeaders();
    
    if (this.isAuthenticated) {
      endpoint = 'https://pt.gda.one/api/tests/v1/shipments/list';
      const token = this.cookieService.get('authToken');
      headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    } else {
      endpoint = 'https://pt.gda.one/api/tests/v1/shipments/share/list';
    }

    this.http.get<any>(endpoint, { headers })
      .subscribe({
        next: response => {
          console.log('Shipments API response:', response);
          if (response && Array.isArray(response.items)) {
            this.shipments = response.items.map((item: any) => ({
              id: item.id,
              customer: item.customer,
              pickupDate: item.pickup_date,
              pickupLocation: item.pickup_location,
              deliveryDate: item.delivery_date,
              deliveryLocation: item.delivery_location,
              distance: item.distance,
              weight: item.weight,
              status: item.status,
              price: item.price,
              progress: item.progress
            }));
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        error: err => {
          console.error('Error fetching shipments:', err);
          if (err.status === 401) {
            this.isAuthenticated = false;
            this.loadShipments();
          }
        }
      });
  }


  updateStatus(shipment: any, newStatus: string): void {
    if (!this.isAuthenticated) {
      return; 
    }
    const url = `https://pt.gda.one/api/tests/v1/shipments/status?uuid=${shipment.id}`;
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log("Updating shipment status. URL:", url);
    this.http.post(url, { status: newStatus }, { headers })
      .subscribe({
        next: () => {
          shipment.status = newStatus;
          console.log('Shipment status updated successfully.');
        },
        error: err => {
          console.error('Error updating shipment status:', err);
          if (err.status === 401) {
            this.isAuthenticated = false;
            this.loadShipments();
          }
        }
      });
  }

  onStatusChange(shipment: any, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.updateStatus(shipment, selectElement.value);
  }

  refreshShipments(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.loadShipments();
  }
}