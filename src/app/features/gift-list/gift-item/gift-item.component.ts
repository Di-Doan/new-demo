import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { GiftDetailComponent } from '../gift-detail/gift-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-gift-item',
  standalone: true,
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.scss'],
  imports: [CarouselModule, GiftDetailComponent],
})
export class GiftItemComponent implements OnInit {
  @ViewChild('giftDetailModal') modal!: GiftDetailComponent
  @Input() oddList!: boolean
  modalVisible = false

  ranges = [1,2,3,4,5,6,7,8,9,10,11,12]
  page = {
    current: 1,
    total : Math.ceil(this.ranges.length/5)
  }
  constructor() { }

  ngOnInit() {
  }

  pageChange(event: any) {
    this.page.current = event.page + 1
  }

  openGiftDetail() {
    this.modal?.open();

  }

}
