import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-matterhorn-popup',
  templateUrl: './matterhorn-popup.component.html',
  standalone: true,
  styleUrls: ['./matterhorn-popup.component.css'],
  imports: [CommonModule],
})
export class MatterhornPopupComponent {
  @Input() className: string = '';
  @Output() onClose = new EventEmitter<void>();

  constructor() {}

  onCloseClick() {
    if (this.onClose) {
      this.onClose.emit();
    }
  }
}
