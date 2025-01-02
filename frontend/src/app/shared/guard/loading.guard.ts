import { inject, Injectable } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { SpinnerService } from '../../core/service/spinner.service';
import { delay, finalize, of } from 'rxjs';

export const loadingMatch: CanMatchFn = () => {
    const spinnerService = inject(SpinnerService);
  
    spinnerService.show();
  
    return of(true).pipe(
      delay(5), 
      finalize(() => {
        spinnerService.hide();
      })
    );
  };