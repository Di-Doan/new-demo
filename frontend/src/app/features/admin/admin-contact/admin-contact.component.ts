import { CommonModule } from "@angular/common";
import { Component, OnChanges, OnInit} from "@angular/core";
import { ContactModel} from "../../../shared/models";
import { Subject, takeUntil } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { ConfirmationService, MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { ContactService } from "../../../core/service/contact.service";

@Component({
  selector: "app-admin-contact",
  standalone: true,
  templateUrl: "./admin-contact.component.html",
  styleUrls: ["./admin-contact.component.scss"],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AdminContactComponent implements OnInit, OnChanges {

  contactList!: ContactModel[];

  contact!: ContactModel;

  selectedContacts!: ContactModel[] | null;

  submitted: boolean = false;

  destroyed$ = new Subject<void>();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.fetchContactList()
  }

  ngOnChanges() {
    this.fetchContactList();
  }

  fetchContactList() {
    this.contactService
      .getAllContact()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.contactList = res.data.result;
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: "error",
            summary: "Lỗi",
            detail: error.error.errMessage,
            life: 3000,
          });
        },
      });
  }

  deleteSelectedContacts() {
    this.confirmationService.confirm({
      message: "Xác nhận xoá liên hệ đã chọn?",
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.contactService
          .deleteMultipleContact(this.selectedContacts)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: () => {
              this.selectedContacts = null;
              this.messageService.add({
                severity: "success",
                summary: "Thành công",
                detail: "Xoá liên hệ thành công",
                life: 3000,
              });
              setTimeout(() => {
                // Debugging line
                this.fetchContactList();
              }, 1500);
            },
            error: (error: HttpErrorResponse) => {
              this.messageService.add({
                severity: "error",
                summary: "Lỗi",
                detail: error.error.errMessage,
                life: 3000,
              });
            },
          });
      },
    });
  }

  
    deleteContact(contact: ContactModel) {
      this.confirmationService.confirm({
        message: "Xác nhận xoá " + contact.name + "?",
        header: "Xác nhận",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.contactService
            .deleteSelectedContacts(contact._id)
            .pipe(takeUntil(this.destroyed$))
            .subscribe({
              next: () => {
                this.contact = new ContactModel();
                this.messageService.add({
                  severity: "success",
                  summary: "Thành công",
                  detail: "Xoá liên hệ thành công",
                  life: 3000,
                });
  
                setTimeout(() => {
                  this.fetchContactList();
                }, 1500);
              },
              error: (error: HttpErrorResponse) => {
                this.messageService.add({
                  severity: "error",
                  summary: "Lỗi",
                  detail: error.error.errMessage,
                  life: 3000,
                });
              },
            });
        },
      });
    }
  

}
