import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoginComponent } from '../../features/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CarouselModule, CommonModule, LoginComponent]
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginModal') modal?: LoginComponent
  slides: any[] = [
    '../../../assets/img/banner1.png',
    '../../../assets/img/banner2.png',
    '../../../assets/img/banner3.png',
    '../../../assets/img/banner4.png',
  ];
  user = 'Di'

  constructor() {}

  ngOnInit() {}

  openLoginModal() {
    this.modal?.open()
  }

  logout() {
    this.user = ''
  }

}
