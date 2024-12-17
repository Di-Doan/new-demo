import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { Subject, takeUntil } from "rxjs";
import { CommonModule } from '@angular/common';

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-footer",
  standalone: true,
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ToastModule],
  providers: [MessageService]
})
export class FooterComponent implements OnInit, OnDestroy {
  subscriptionForm: string = ''
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
  subscriptionFormError = ''

  destroyed$ = new Subject<void>();

  constructor(private authService: AuthService, private messageService: MessageService) {}

  ngOnDestroy(){
    this.destroyed$.next()
    this.destroyed$.complete()
  }
  

  ngOnInit() {}

  submitForm() {
    if (!this.subscriptionForm.match(this.emailPattern)) {
      return
    }
    
    this.authService
      .sendSubscriptionEmail(this.subscriptionForm)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.subscriptionFormError = ''
          this.subscriptionForm = ''
          this.messageService.add({
            severity: "success",
            summary: "Thành công",
            detail: "Đăng ký nhận thông báo thành công",
            life: 3000,
          });
        },
        error: (error: HttpErrorResponse) => {
          if (error.error && error.error.errMessage) {
            this.subscriptionFormError = error.error.errMessage;
          } else {
            this.subscriptionFormError= "Unexpected Error";
          }
        }
      }
      );
  }
}
