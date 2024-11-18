import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild , Renderer2, Input, OnChanges, SimpleChanges} from '@angular/core';
import { GiftModel } from '../../../shared/models';

@Component({
  selector: 'app-gift-detail',
  standalone: true,
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.scss'],
  imports: [CommonModule]
})
export class GiftDetailComponent implements OnInit, OnChanges {
  @Input() giftDetail!: GiftModel
  visible = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}

