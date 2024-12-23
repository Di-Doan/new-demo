import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserGiftService } from "../../core/service/userGift.service";
import { Subject, takeUntil } from "rxjs";
import { GiftModel } from "../../shared/models";
import { HttpErrorResponse } from "@angular/common/http";
import { GiftCardComponent } from "./gift-card/gift-card.component";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-gift",
  standalone: true,
  templateUrl: "./user-gift.component.html",
  styleUrls: ["./user-gift.component.scss"],
  imports: [GiftCardComponent, ToastModule, CommonModule],
  providers: [MessageService],
})
export class UserGiftComponent implements OnInit, OnDestroy {
  giftList!: GiftModel[];
  destroyed$ = new Subject<void>();

  emptyList = false;

  constructor(
    private userGiftService: UserGiftService,
    private messageService: MessageService
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.getGiftList();
  }

  getGiftList() {
    this.userGiftService
      .getAllUserGift()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.giftList = res.data.list;
        },
        error: (error: HttpErrorResponse) => {
          this.emptyList = true;
          if (error.error.errCode != 118) {
            this.messageService.add({
              severity: "error",
              summary: "Lỗi",
              detail: error.error.errMessage,
              life: 3000,
            });
          }
        },
      });
  }
}
