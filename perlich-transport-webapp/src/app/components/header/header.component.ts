import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSignedIn = false;

  constructor(
    private authService: AuthService, 
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.authService.authStatus.subscribe(status => {
      this.isSignedIn = status;
    });

    this.isSignedIn = this.authService.isLoggedIn();
  }

  openSignIn() {
    this.modalService.openSignInModal();
  }

  signOut() {
    this.authService.logout();
    this.isSignedIn = false;
  }

}
