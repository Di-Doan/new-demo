import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GiftItemComponent } from './gift-item/gift-item.component';
import { GiftDetailComponent } from './gift-detail/gift-detail.component';
import { Subscription } from 'rxjs';
import { GiftService } from '../../core/service/gift.service';
import { GiftModel } from '../../shared/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss'],
  imports: [GiftItemComponent, GiftDetailComponent, CommonModule, FormsModule],
})
export class GiftListComponent implements OnInit, OnDestroy {
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

  userPoint = 50;

  constructor(private httpService: GiftService) {}
  ngOnDestroy(): void {
    if (this.giftSubcription) {
      this.giftSubcription.unsubscribe();
    }
  }

  ngOnInit() {
    this.giftSubcription = this.httpService.getPost().subscribe(
      (response) => {
        this.giftData = response.default;
        // this.hotGift = [...this.giftData];
        // this.canExchangeGift = [...this.giftData];
        // this.aboutToExchangeGift = [...this.giftData]
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterByHot(isHot: boolean) {
    this.isHotFilter = isHot;
    this.filterHotData();
  }

  filterByCanExchange(isCanExchange: boolean) {
    this.canExchangeFilter = isCanExchange;
    this.filterCanExchangeData();
  }

  filterByAboutToExchange(isAboutToExchange: boolean) {
    this.aboutToExchangeFilter = isAboutToExchange;
    this.filterAboutToExchangeData();
  }

  filterHotData(): void {
    this.hotGift = this.giftData.filter((item) => {
      const matchesHot = this.isHotFilter ? item.isHot : true;
      return matchesHot;
    });

    this.noHotItemsFound = this.hotGift.length === 0;
  }

  filterCanExchangeData(): void {
    this.canExchangeGift = this.giftData.filter((item) => {
      const matchesCanExchange = item.point <= this.userPoint
      return matchesCanExchange
    })

    this.noCanExchangItemsFound = this.canExchangeGift.length === 0;
  }

  filterAboutToExchangeData(): void {
    this.aboutToExchangeGift = this.giftData.filter((item) => {
      const matchesAboutToExchange = this.userPoint < item.point && item.point <= this.userPoint*1.2
      return matchesAboutToExchange
    })

    this.noAboutToExchangItemsFound = this.aboutToExchangeGift.length === 0;
  }

  filterAll() {
    this.isHotFilter = true
    this.filterHotData();
    this.canExchangeFilter = true;
    this.filterCanExchangeData();
    this.aboutToExchangeFilter = true;
    this.filterAboutToExchangeData();
  }
}
