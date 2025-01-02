import { CommonModule } from "@angular/common";
import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
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
import { SubscriptionModel } from "../../../shared/models";
import { SubscriptionService } from "../../../core/service/subscription.service";


@Component({
  selector: "app-admin-subscription",
  standalone: true,
  templateUrl: "./admin-subscription.component.html",
  styleUrls: ["./admin-subscription.component.scss"],
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
export class AdminSubscriptionComponent
  implements OnInit, OnChanges, OnDestroy
{
  subscriptionList!: SubscriptionModel[];

  subscription!: SubscriptionModel;

  selectedSubscriptions!: SubscriptionModel[] | null;

  submitted: boolean = false;

  destroyed$ = new Subject<void>();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.fetchSubscriptionList();
  }

  ngOnChanges() {
    this.fetchSubscriptionList();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  fetchSubscriptionList() {
    this.subscriptionService
      .getAllSubscription()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.subscriptionList = res.data.result;
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

  deleteSelectedSubscriptions() {
    this.confirmationService.confirm({
      message: "Xác nhận xoá đăng ký đã chọn?",
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.subscriptionService
          .deleteMultipleSubscription(this.selectedSubscriptions)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: () => {
              this.selectedSubscriptions = null;
              this.messageService.add({
                severity: "success",
                summary: "Thành công",
                detail: "Xoá đăng ký thành công",
                life: 3000,
              });
              setTimeout(() => {
                // Debugging line
                this.fetchSubscriptionList();
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

  deleteSubscription(subscription: SubscriptionModel) {
    this.confirmationService.confirm({
      message: "Xác nhận xoá " + subscription.userEmail + "?",
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.subscriptionService
          .deleteSelectedSubscriptions(subscription._id)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: () => {
              this.subscription = new SubscriptionModel();
              this.messageService.add({
                severity: "success",
                summary: "Thành công",
                detail: "Xoá đăng ký thành công",
                life: 3000,
              });

              setTimeout(() => {
                this.fetchSubscriptionList();
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
