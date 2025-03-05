import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.services';


@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private modalService: ModalService
  ) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password);
    this.modalService.closeSignInModal();

  }

  cancel(): void {
    this.modalService.closeSignInModal();
  }
}
