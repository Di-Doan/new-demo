import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gift-detail',
  standalone: true,
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.scss'],
  imports: []
})
export class GiftDetailComponent implements OnInit {
  @ViewChild('giftDetail') giftDetail: any;

  constructor() { }

  ngOnInit() {
  }

}
