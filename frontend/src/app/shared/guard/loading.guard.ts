import { inject, Injectable } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { SpinnerService } from '../../core/service/spinner.service';
import { delay, finalize, of } from 'rxjs';

export const loadingMatch: CanMatchFn = () => {
    const spinnerService = inject(SpinnerService);
  
    // Show the spinner when loading starts
    spinnerService.show();
  
    // Simulate a delay (e.g., for fetching lazy-loaded module)
    return of(true).pipe(
      delay(10), // Simulated network delay
      finalize(() => {
        // Hide the spinner when loading ends
        spinnerService.hide();
      })
    );
  };