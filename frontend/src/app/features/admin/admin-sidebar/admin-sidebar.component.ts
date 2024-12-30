import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class AdminSidebarComponent implements OnInit {
  admin = {name: ''}
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe((value) => {
      this.admin.name = value.name;
    });
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  

}
