import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { GiftDetailComponent } from '../gift-detail/gift-detail.component';
import { GiftModel } from '../../../shared/models';


@Component({
  selector: 'app-gift-item',
  standalone: true,
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.scss'],
  imports: [CarouselModule, GiftDetailComponent],
})
export class GiftItemComponent implements OnInit, OnChanges {
  @ViewChild('giftDetailModal') modal!: GiftDetailComponent
  @Input() giftList!: GiftModel[]
  @Input() oddList!: boolean


  currentPage = 1
  totalPage!: number

  selectedGift!: GiftModel

  constructor() { }

  ngOnInit() {
    if (this.giftList) {
      this.totalPage = Math.ceil(this.giftList.length/4)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.giftList) {
      this.totalPage = Math.ceil(this.giftList.length/4)
    }
  }

  pageChange(event: any) {
    this.currentPage = event.page + 1
  }

  openGiftDetail(giftItem: GiftModel) {
    this.selectedGift = giftItem
    this.modal?.open();

  }

}
