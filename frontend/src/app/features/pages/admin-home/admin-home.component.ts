import { AdminNavbarComponent } from './../../admin/admin-navbar/admin-navbar.component';
import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../../admin/admin-sidebar/admin-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  imports: [AdminSidebarComponent, AdminNavbarComponent, RouterOutlet]
})
export class AdminHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
