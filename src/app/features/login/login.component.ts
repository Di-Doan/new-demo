import { CommonModule } from '@angular/common';
import { Component, OnInit, inject,  TemplateRef} from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule]
})
export class LoginComponent {
  visible = false

  constructor() { }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}
