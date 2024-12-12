import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../core/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../core/footer/footer.component';
import { ContactComponent } from '../../contact/contact.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ContactComponent, RouterModule]
})
export class UserHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
