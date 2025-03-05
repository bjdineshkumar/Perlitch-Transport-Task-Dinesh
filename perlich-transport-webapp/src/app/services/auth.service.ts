import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authUrl = 'https://pt.gda.one/api/tests/v1/login';
  private statusUrl = 'https://pt.gda.one/api/tests/v1/status';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus = this.isAuthenticated.asObservable();

  private tokenRenewalTimer: any = null;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(username: string, password: string) {
    this.http.post<{ access_token: string, token_type: string, user: any }>(
      this.authUrl, 
      { login: username, password }
    ).subscribe({
      next: res => {
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 7);
        this.cookieService.set('authToken', res.access_token, expiryDate, '/');

        this.isAuthenticated.next(true);
        this.startTokenRenewal();
        this.router.navigate(['/shipments']);
      },
      error: err => {
        console.error('Login failed', err);
        alert('Login failed');
      }
    });
  }

  logout() {
    if (this.tokenRenewalTimer) {
      clearInterval(this.tokenRenewalTimer);
      this.tokenRenewalTimer = null;
    }
    this.cookieService.delete('authToken');
    this.isAuthenticated.next(false);
    this.router.navigate(['/contacts']);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('authToken');
  }


private startTokenRenewal(): void {
  if (this.tokenRenewalTimer) {
    clearInterval(this.tokenRenewalTimer);
  }
  this.tokenRenewalTimer = setInterval(() => {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    console.log("inisde the refresh token function");

    this.http.get<{ token: string }>(this.statusUrl, { headers })
      .subscribe({
        next: res => {
          console.log(res);
          if (res && res.token) {
            const expiryDate = new Date();
            expiryDate.setMinutes(expiryDate.getMinutes() + 7);
            this.cookieService.set('authToken', res.token, expiryDate, '/');
            console.log('Token renewed');
          }
        },
        error: err => {
          if (err.status === 401) {
            clearInterval(this.tokenRenewalTimer);
            this.tokenRenewalTimer = null;
            console.error('Token renewal failed with 401. Logging out.');
            this.logout();
          }
        }
      });
  }, 5 * 60 * 1000);
}
}

