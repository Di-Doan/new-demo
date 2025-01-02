import {
  Component,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { GiftItemComponent } from "./gift-item/gift-item.component";
import { Subscription } from "rxjs";
import { GiftService } from "../../core/service/gift.service";
import { GiftModel } from "../../shared/models";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../core/service/auth.service";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-gift-list",
  standalone: true,
  templateUrl: "./gift-list.component.html",
  styleUrls: ["./gift-list.component.scss"],
  imports: [GiftItemComponent, CommonModule, FormsModule, ToastModule],
  providers: [MessageService],
})
export class GiftListComponent implements OnInit, OnDestroy, OnChanges {
  giftSubcription!: Subscription;
  giftData!: GiftModel[];

  hotGift!: GiftModel[];
  isHotFilter!: boolean;
  noHotItemsFound: boolean = false;

  canExchangeGift!: GiftModel[];
  canExchangeFilter!: boolean;
  noCanExchangItemsFound: boolean = false;

  aboutToExchangeGift!: GiftModel[];
  aboutToExchangeFilter!: boolean;
  noAboutToExchangItemsFound: boolean = false;

  showList = {
    hot: false,
    canExchange: false,
    aboutToExchange: false,
  };

  user = { name: "", point: "", role: "" };

  constructor(
    private httpService: GiftService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.updateUserInfo();
  }
  ngOnDestroy(): void {
    if (this.giftSubcription) {
      this.giftSubcription.unsubscribe();
    }
  }

  ngOnInit() {
    this.fetchData();

    this.updateUserInfo();
  }

  updateUserInfo() {
    this.authService.user$.subscribe((userData) => {
      if (userData) {
        this.user = userData;
      }
    });
  }

  fetchData() {
    this.giftSubcription = this.httpService.getPost().subscribe({
      next: (response) => {
        this.giftData = response.data.result;
        this.filterByHot(true);
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

  filterByHot(isHot: boolean) {
    this.isHotFilter = isHot;
    this.filterHotData(isHot);
  }

  filterByCanExchange(isCanExchange: boolean) {
    this.canExchangeFilter = isCanExchange;
    this.filterCanExchangeData(isCanExchange);
  }

  filterByAboutToExchange(isAboutToExchange: boolean) {
    this.aboutToExchangeFilter = isAboutToExchange;
    this.filterAboutToExchangeData(isAboutToExchange);
  }

  filterHotData(change: boolean): void {
    this.showList.hot = change;
    this.hotGift = this.giftData.filter((item) => {
      const matchesHot = this.isHotFilter ? item.isHot : true;
      return matchesHot;
    });

    this.noHotItemsFound = this.hotGift.length === 0;
  }

  filterCanExchangeData(change: boolean): void {
    this.showList.canExchange = change;
    this.canExchangeGift = this.giftData.filter((item) => {
      const matchesCanExchange = item.point <= Number(this.user.point);
      return matchesCanExchange;
    });

    this.noCanExchangItemsFound = this.canExchangeGift.length === 0;
  }

  filterAboutToExchangeData(change: boolean): void {
    this.showList.aboutToExchange = change;
    this.aboutToExchangeGift = this.giftData.filter((item) => {
      const matchesAboutToExchange =
        Number(this.user.point) < item.point &&
        item.point <= Number(this.user.point) * 1.2;
      return matchesAboutToExchange;
    });

    this.noAboutToExchangItemsFound = this.aboutToExchangeGift.length === 0;
  }

  filterAll() {
    this.isHotFilter = true;
    this.filterHotData(true);
    this.canExchangeFilter = true;
    this.filterCanExchangeData(true);
    this.aboutToExchangeFilter = true;
    this.filterAboutToExchangeData(true);
  }
}
