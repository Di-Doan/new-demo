import { CommonModule } from "@angular/common";
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
import { GiftModel } from "../../../shared/models";
import { PointPipe } from "../../../shared/pipes/point.pipe";
import { AuthService } from "../../../core/service/auth.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { Subject, takeUntil } from "rxjs";
import { UserGiftService } from "../../../core/service/userGift.service";
import { HttpErrorResponse } from "@angular/common/http";
import { TokenHelper } from "../../../shared/helper/token.helper";

@Component({
  selector: "app-gift-detail",
  standalone: true,
  templateUrl: "./gift-detail.component.html",
  styleUrls: ["./gift-detail.component.scss"],
  imports: [CommonModule, PointPipe, ToastModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
})
export class GiftDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() giftDetail!: GiftModel;
  user = { name: "", point: '', role: "" };
  visible = false;
  alertVisible = false;

  destroyed$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userGiftService: UserGiftService,
    private tokenHelper: TokenHelper
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateUserInfo();
  }

  ngOnInit() {
    this.updateUserInfo();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  updateUserInfo() {
    this.authService.user$.subscribe((userData) => {
      if (userData) {
        this.user = userData;
      }
    });
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  exchangeGift() {
    this.confirmationService.confirm({
      message: "Xác nhận đổi quà tặng?",
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.userGiftService
          .exchangeGift(this.giftDetail._id)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: (res) => {
              this.close();
              this.authService.updateUserData(this.tokenHelper.fetchUserDataCookie())
              this.messageService.add({
                severity: "success",
                summary: "Thành công",
                detail: "Đổi quà thành công",
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse)=> {
              this.messageService.add({
                severity: "error",
                summary: "Lỗi",
                detail: error.error.errMessage,
                life: 3000,
              });
            }
          });
      },
    });
  }
}
