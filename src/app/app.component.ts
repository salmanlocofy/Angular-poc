import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PortalPopupComponent } from './components/portal-popup/portal-popup.component';
import { CommonModule } from '@angular/common';
import { MatterhornPopupComponent } from './components/matterhorn-popup/matterhorn-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    PortalPopupComponent,
    MatterhornPopupComponent,
  ],
})
export class AppComponent {
  constructor(public router: Router) {}
  showPopup = false;
  @ViewChild('relativeRef', { static: true }) relativeLayerRef!: ElementRef;

  // @ViewChild('relativeRef', { static: true }) relativeRef!: ElementRef;
  togglePopup() {
    this.showPopup = true;
  }
  hidePopup() {
    this.showPopup = false;
  }
  title = 'sang-test';
}
