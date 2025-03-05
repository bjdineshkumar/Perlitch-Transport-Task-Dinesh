import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.services';
import { MenuComponent } from './components/menu/menu.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MenuComponent, RouterOutlet, SignInComponent, CommonModule],
  template: `
    <app-header></app-header>
    <app-menu></app-menu>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-sign-in *ngIf="showSignInModal" class="modal-overlay"></app-sign-in>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'perlich-transport-webapp';
  showSignInModal = false;
  constructor(private modalService: ModalService) {
    this.modalService.showSignInModal$.subscribe(val => this.showSignInModal = val);
  }
}
