import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { GiftModel } from '../../../shared/models';

@Component({
  selector: 'app-gift-card',
  standalone: true,
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss'],
  imports: [CardModule, ButtonModule, CommonModule]
})
export class GiftCardComponent implements OnInit {
  @Input() giftDetail!: GiftModel

  constructor() { }

  ngOnInit() {
  }

}
