import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal = inject(NgbModal);

  confirm(options: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
  }): Promise<boolean> {
    const modalRef = this.modal.open(ModalDialogComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.componentInstance.title = options.title ?? 'Confirm';
    modalRef.componentInstance.message = options.message;
    modalRef.componentInstance.confirmText = options.confirmText ?? 'Ok';
    modalRef.componentInstance.cancelText = options.cancelText ?? 'Cancel';
    modalRef.componentInstance.danger = options.danger ?? false;

    return modalRef.result.then(
      () => true,
      () => false
    );
  }
}
