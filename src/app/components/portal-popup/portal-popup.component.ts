import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { MatterhornPopupComponent } from '../matterhorn-popup/matterhorn-popup.component';

@Component({
  selector: 'app-portal-popup',
  templateUrl: './portal-popup.component.html',
  styleUrls: ['./portal-popup.component.css'],
  standalone: true,
  imports: [CommonModule, PortalComponent, MatterhornPopupComponent],
})
export class PortalPopupComponent implements AfterViewInit, OnDestroy {
  @Input() overlayColor: string | undefined;
  @Input() placement:
    | 'Centered'
    | 'Top left'
    | 'Top center'
    | 'Top right'
    | 'Bottom left'
    | 'Bottom center'
    | 'Bottom right' = 'Centered';
  @Input() zIndex: number = 100;
  @Input() left: number = 0;
  @Input() right: number = 0;
  @Input() top: number = 0;
  @Input() bottom: number = 0;
  @Input() relativeLayerRef: any | undefined;
  @Output() onOutsideClick = new EventEmitter<void>();

  @ViewChild('relContainer', { static: true }) relContainerRef!: ElementRef;

  relativeStyle: any = { opacity: 0 };

  getPopupStyle = () => {
    const style: any = {};
    style.zIndex = this.zIndex;

    if (this.overlayColor) {
      style.backgroundColor = this.overlayColor;
    }
    if (!this.relativeLayerRef) {
      switch (this.placement) {
        case 'Centered':
          style.alignItems = 'center';
          style.justifyContent = 'center';
          break;
        case 'Top left':
          style.alignItems = 'flex-start';
          break;
        case 'Top center':
          style.alignItems = 'center';
          break;
        case 'Top right':
          style.alignItems = 'flex-end';
          break;
        case 'Bottom left':
          style.alignItems = 'flex-start';
          style.justifyContent = 'flex-end';
          break;
        case 'Bottom center':
          style.alignItems = 'center';
          style.justifyContent = 'flex-end';
          break;
        case 'Bottom right':
          style.alignItems = 'flex-end';
          style.justifyContent = 'flex-end';
          break;
      }
    }
    style.opacity = 1;
    return style;
  };

  constructor(private renderer: Renderer2, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.setPosition();
    window.addEventListener('resize', this.setPosition);
    window.addEventListener('scroll', this.setPosition, true);
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.setPosition);
    window.removeEventListener('scroll', this.setPosition, true);
  }

  setPosition = () => {
    const relativeItem =
      this.relativeLayerRef?.nativeElement?.getBoundingClientRect();
    const containerItem =
      this.relContainerRef.nativeElement.getBoundingClientRect();
    const style: any = { opacity: 1 };

    if (relativeItem && containerItem) {
      const {
        x: relativeX,
        y: relativeY,
        width: relativeW,
        height: relativeH,
      } = relativeItem;
      const { width: containerW, height: containerH } = containerItem;
      style.position = 'absolute';
      switch (this.placement) {
        case 'Top left':
          style.top = `${relativeY - containerH - this.top}px`;
          style.left = `${relativeX + this.left}px`;
          break;
        case 'Top right':
          style.top = `${relativeY - containerH - this.top}px`;
          style.left = `${relativeX + relativeW - containerW - this.right}px`;
          break;
        case 'Bottom left':
          style.top = `${relativeY + relativeH + this.bottom}px`;
          style.left = `${relativeX + this.left}px`;
          break;
        case 'Bottom right':
          style.top = `${relativeY + relativeH + this.bottom}px`;
          style.left = `${relativeX + relativeW - containerW - this.right}px`;
          break;
      }
      this.relativeStyle = style;
    } else {
      style.maxWidth = '90%';
      style.maxHeight = '90%';
      this.relativeStyle = style;
    }
    this.cd.detectChanges();
  };

  handleOverlayClick(event: Event) {
    if (
      this.onOutsideClick &&
      (event.target as HTMLElement).classList.contains('portalPopupOverlay')
    ) {
      this.onOutsideClick.emit();
    }
    event.stopPropagation();
  }
}
