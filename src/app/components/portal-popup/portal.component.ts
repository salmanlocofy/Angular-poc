import { Component, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { MatterhornPopupComponent } from '../matterhorn-popup/matterhorn-popup.component';

@Component({
  selector: 'app-portal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: [MatterhornPopupComponent],
})
export class PortalComponent implements OnInit, OnDestroy {
  @Input() containerId: string = 'portals';
  private portalContainer: HTMLElement | undefined;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const existingContainer = document.getElementById(this.containerId);
    if (existingContainer) {
      this.portalContainer = existingContainer as HTMLElement;
    } else {
      this.portalContainer = this.renderer.createElement('div');
      this.renderer.setAttribute(this.portalContainer, 'id', this.containerId);
      this.renderer.appendChild(document.body, this.portalContainer);
    }
  }

  ngOnDestroy() {
    if (this.portalContainer) {
      this.renderer.removeChild(document.body, this.portalContainer);
    }
  }
}
