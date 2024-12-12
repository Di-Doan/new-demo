import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ContactService } from "../../core/service/contact.service";
import { HttpErrorResponse } from "@angular/common/http";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-contact",
  standalone: true,
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ToastModule],
  providers: [MessageService]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  contactError!: string;

  destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      title: ["", Validators.required],
      note: [""],
    });
  }

  submitForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.contactError = "Đã có lỗi xảy ra. Vui lòng thử lại.";
      return;
    }

    this.contactService
      .createNewContact(this.contactForm.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res)=> {
          this.contactForm.reset()
          this.messageService.add({
            severity: "success",
            summary: "Thành công",
            detail: "Lưu thông tin liên hệ thành công",
            life: 3000,
          });
        },
        error: (error: HttpErrorResponse)=> {
          this.contactError = error.error.errMessage;
        }
      });
  }
}
