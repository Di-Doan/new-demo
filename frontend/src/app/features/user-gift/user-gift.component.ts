import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserGiftService } from "../../core/service/userGift.service";
import { Subject, takeUntil } from "rxjs";
import { GiftModel } from "../../shared/models";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-user-gift",
  standalone: true,
  templateUrl: "./user-gift.component.html",
  styleUrls: ["./user-gift.component.scss"],
})
export class UserGiftComponent implements OnInit, OnDestroy {
  giftlist!: GiftModel[];
  destroyed$ = new Subject<void>();

  constructor(private userGiftService: UserGiftService) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.getGiftList()
  }

  getGiftList() {
    this.userGiftService.getAllUserGift().pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        }
      });
  }
}
