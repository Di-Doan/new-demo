import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { GiftModel } from '../../../shared/models';
import { PointPipe } from '../../../shared/pipes/point.pipe';

@Component({
  selector: 'app-gift-detail',
  standalone: true,
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.scss'],
  imports: [CommonModule, PointPipe],
})
export class GiftDetailComponent implements OnInit {
  @Input() giftDetail!: GiftModel;
  user = true;
  visible = false;
  alertVisible = false

  constructor() {}

  ngOnInit() {}

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  openAlert() {
    this.alertVisible = true
  }

  closeAlert() {
    this.alertVisible = false
    this.close()

  }

}
