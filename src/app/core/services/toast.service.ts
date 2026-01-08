import { Injectable, TemplateRef } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export interface Toast {
  textOrTpl: string | TemplateRef<any>;
  classname: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Toast[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: Partial<Toast> = {}) {
    this.toasts.push({
      textOrTpl,
      classname: options.classname || '',
      delay: options.delay || 2000,
    });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts = [];
  }

  success(message: string, delay?: number) {
    this.show(message, { classname: 'bg-success text-light', delay });
  }

  /**
   * Show a toast and return an Observable that completes after the toast delay
   * so callers can react when the toast disappears.
   */
  success$(message: string, delay?: number): Observable<void> {
    const d = delay ?? 2000;
    this.show(message, { classname: 'bg-success text-light', delay: d });
    return timer(d).pipe(mapTo(void 0));
  }

  error(message: string) {
    this.show(message, {
      classname: 'bg-danger text-light',
      delay: 2000,
    });
  }

  warning(message: string) {
    this.show(message, {
      classname: 'bg-warning text-dark',
      delay: 2000,
    });
  }
}
