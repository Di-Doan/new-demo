import { Component, OnInit } from '@angular/core';
import { GiftItemComponent } from './gift-item/gift-item.component';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss'],
  imports: [GiftItemComponent]
})
export class GiftListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
