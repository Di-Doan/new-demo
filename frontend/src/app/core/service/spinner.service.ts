import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private pendingRequests = 0;
  private loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading.asObservable().pipe(delay(0));

  show(): void {
    if (this.pendingRequests === 0) {
      this.loading.next(true);
    }
    this.pendingRequests++;
  }

  hide(): void {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.loading.next(false);
    }
  }
  

  // For debugging purposes
  get pendingRequestsCount(): number {
    return this.pendingRequests;
  }

  // Force reset (useful for error cases)
  reset(): void {
    this.pendingRequests = 0;
    this.loading.next(false);
  }
}
