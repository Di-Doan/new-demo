import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgbCarouselModule]
})
export class HeaderComponent implements OnInit {
  slides: any[] = new Array(4).fill({ id: -1, src: '', title: '', subtitle: '' });

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      src: '../../../assets/img/banner1.png'
    };
    this.slides[1] = {
      src: '../../../assets/img/banner2.png'
    };
    this.slides[2] = {
      src: '../../../assets/img/banner3.png'
    };
    this.slides[3] = {
      src: '../../../assets/img/banner4.png'
    };
  }



}
