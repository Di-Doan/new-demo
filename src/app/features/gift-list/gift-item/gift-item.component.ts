import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-gift-item',
  standalone: true,
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.scss'],
  imports: [CarouselModule]
})
export class GiftItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
