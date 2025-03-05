// src/app/services/modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private signInModalSubject = new BehaviorSubject<boolean>(false);
  showSignInModal$ = this.signInModalSubject.asObservable();

  openSignInModal(): void {
    this.signInModalSubject.next(true);
  }

  closeSignInModal(): void {
    this.signInModalSubject.next(false);
  }
}
