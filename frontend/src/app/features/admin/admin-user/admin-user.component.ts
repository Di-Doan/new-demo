import { CommonModule } from "@angular/common";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { AuthService } from "../../../core/service/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Subject, takeUntil } from "rxjs";
import { UserModel } from "../../../shared/models";

import { ConfirmationService, MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { FormsModule } from "@angular/forms";
import { InputNumberModule } from "primeng/inputnumber";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-admin-user",
  standalone: true,
  templateUrl: "./admin-user.component.html",
  styleUrls: ["./admin-user.component.scss"],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputIconModule,
    IconFieldModule,
    InputNumberModule,
    RadioButtonModule,
    InputTextModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AdminUserComponent implements OnInit, OnChanges {
  userList!: UserModel[];

  userDialog: boolean = false;

  user!: UserModel;

  selectedUsers!: UserModel[] | null;

  submitted: boolean = false;

  destroyed$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchUserList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchUserList();
  }

  fetchUserList() {
    this.authService
      .fetchAllUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.userList = res.data;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  openNew() {
    this.user = new UserModel();
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: "Xác nhận xoá người dùng đã chọn?",
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.authService
          .deleteMultipleUsers(this.selectedUsers)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: () => {
              this.selectedUsers = null;
              this.messageService.add({
                severity: "success",
                summary: "Thành công",
                detail: "Xoá người dùng thành công",
                life: 3000,
              });
              setTimeout(() => {
                this.fetchUserList();
              }, 1500);
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            },
          });
      },
    });
  }

  editUser(user: UserModel) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: UserModel) {
    this.confirmationService.confirm({
      message: "Xác nhận xoá " + user.name + "?",
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.authService
          .deleteSelectedUser(user._id)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: () => {
              this.user = new UserModel();
              this.messageService.add({
                severity: "success",
                summary: "Thành công",
                detail: "Xoá người dùng thành công",
                life: 3000,
              });
              setTimeout(() => {
                this.fetchUserList();
              }, 1500);
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            },
          });
      },
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;

    if (Object.values(this.user).some((value) => value === "")) {
      this.messageService.add({
        severity: "error",
        summary: "Thất bại",
        detail: "Vui lòng điền đủ thông tin",
        life: 1500,
      });
      return;
    }
    if (this.user._id) {
      this.authService
        .updateUserInfo(this.user._id, this.user)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.hideDialog();
            this.user = new UserModel();
            this.messageService.add({
              severity: "success",
              summary: "Thành công",
              detail: "Cập nhật người dùng thành công",
              life: 3000,
            });
            setTimeout(() => {
              this.fetchUserList();
            }, 1500);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
    } else {
      this.authService
        .createNewUser(this.user)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.hideDialog();
            this.user = new UserModel();
            this.messageService.add({
              severity: "success",
              summary: "Thành công",
              detail: "Tạo người dùng thành công",
              life: 3000,
            });
            setTimeout(() => {
              this.fetchUserList();
            }, 1500);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
    }
  }
}
