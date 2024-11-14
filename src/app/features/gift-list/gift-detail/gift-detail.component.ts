import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild , Renderer2} from '@angular/core';

@Component({
  selector: 'app-gift-detail',
  standalone: true,
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.scss'],
  imports: [CommonModule]
})
export class GiftDetailComponent implements OnInit {
  visible = false;

  constructor() { }

  ngOnInit() {
  }



  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}

