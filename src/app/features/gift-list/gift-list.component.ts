import { Component, OnDestroy, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
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
    aboutToExchange: false
  }

  userPoint = 550;

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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

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
    this.showList.hot = change
    this.hotGift = this.giftData.filter((item) => {
      const matchesHot = this.isHotFilter ? item.isHot : true;
      return matchesHot;
    });

    this.noHotItemsFound = this.hotGift.length === 0;
  }

  filterCanExchangeData(change: boolean): void {
    this.showList.canExchange = change
    this.canExchangeGift = this.giftData.filter((item) => {
      const matchesCanExchange = item.point <= this.userPoint
      return matchesCanExchange
    })

    this.noCanExchangItemsFound = this.canExchangeGift.length === 0;
  }

  filterAboutToExchangeData(change: boolean): void {
    this.showList.aboutToExchange = change
    this.aboutToExchangeGift = this.giftData.filter((item) => {
      const matchesAboutToExchange = this.userPoint < item.point && item.point <= this.userPoint*1.2
      return matchesAboutToExchange
    })

    this.noAboutToExchangItemsFound = this.aboutToExchangeGift.length === 0;
  }

  filterAll() {
    this.isHotFilter = true
    this.filterHotData(true);
    this.canExchangeFilter = true;
    this.filterCanExchangeData(true);
    this.aboutToExchangeFilter = true;
    this.filterAboutToExchangeData(true);
  }
}
