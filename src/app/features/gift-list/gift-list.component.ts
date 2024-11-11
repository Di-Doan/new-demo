import { Component, OnInit, ViewChild } from '@angular/core';
import { GiftItemComponent } from './gift-item/gift-item.component';
import { GiftDetailComponent } from './gift-detail/gift-detail.component';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss'],
  imports: [GiftItemComponent, GiftDetailComponent]
})
export class GiftListComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
