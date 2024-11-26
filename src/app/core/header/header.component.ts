import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoginComponent } from '../../features/login/login.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CarouselModule, CommonModule, LoginComponent]
})
export class HeaderComponent implements OnInit, OnChanges {
  @ViewChild('loginModal') modal?: LoginComponent
  slides: any[] = [
    '../../../assets/img/banner1.png',
    '../../../assets/img/banner2.png',
    '../../../assets/img/banner3.png',
    '../../../assets/img/banner4.png',
  ];
  user = {name: '', point: ''}

  constructor(private http: AuthService) {}


  ngOnInit() {
    const userData = localStorage.getItem('user')
    if (userData) {
      this.user = JSON.parse(userData)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const userData = localStorage.getItem('user')
    if (userData) {
      this.user = JSON.parse(userData)
      console.log(this.user)
    }
  }

  openLoginModal() {
    this.modal?.open()
  }

  logout() {
    this.user = {name: '', point: ''}
    this.http.logout()
  }

}
