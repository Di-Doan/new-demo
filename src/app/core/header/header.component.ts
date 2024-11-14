import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CarouselModule, CommonModule]
})
export class HeaderComponent implements OnInit {
  slides: any[] = [
    '../../../assets/img/banner1.png',
    '../../../assets/img/banner2.png',
    '../../../assets/img/banner3.png',
    '../../../assets/img/banner4.png',
  ];

  constructor() {}

  ngOnInit() {}
}
