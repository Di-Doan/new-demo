import { Component, OnInit, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-gift-item',
  standalone: true,
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.scss'],
  imports: [CarouselModule]
})
export class GiftItemComponent implements OnInit {
  @Input() oddList!: boolean

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

}
