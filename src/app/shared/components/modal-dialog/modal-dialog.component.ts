import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-dialog',
  imports: [NgClass],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css',
})
export class ModalDialogComponent {
  @Input() title = 'Confirm action';
  @Input() message = '';
  @Input() confirmText = 'Ok';
  @Input() cancelText = 'Cancel';
  @Input() danger = false;

  modal = inject(NgbActiveModal);
}
