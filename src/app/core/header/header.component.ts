import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgbCarouselModule],
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
