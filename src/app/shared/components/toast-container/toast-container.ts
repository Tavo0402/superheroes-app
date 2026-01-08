import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  imports: [NgbToast, NgFor],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css',
})
export class ToastContainer {
  toastService = inject(ToastService);
}
