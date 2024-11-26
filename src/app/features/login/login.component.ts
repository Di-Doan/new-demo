import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  visible = false;
  loginPage = true;

  loginForm!: FormGroup;
  loginError = '';

  forgetPasswordForm = new FormControl('', [Validators.required, Validators.email])
  forgetPasswordError = ''

  userSubcription!: Subscription;

  constructor(private formBuilder: FormBuilder, private http: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  forgetPasswordTab() {
    this.loginPage = false;
  }

  loginTab() {
    this.loginPage = true;
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginError = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      return;
    }
    const userName = String(this.loginForm.get('userName')?.value);
    const password = String(this.loginForm.get('password')?.value);
    this.userSubcription = this.http
      .login(userName, password)
      .subscribe((response) => {
        if (response.message) {
          this.loginError = response.message;
        } else {
          localStorage.setItem('user', JSON.stringify(response));
          window.location.reload()
        }
      });
    return;
  }

  submitForgetPassword() {
    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.markAllAsTouched()
      this.forgetPasswordError = 'Đã có lỗi xảy ra. Vui lòng thử lại.'
      return
    }
  }
}
