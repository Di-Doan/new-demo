import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  visible = false
  loginPage = true

  loginForm!: FormGroup
  loginError = ''

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  forgetPasswordTab() {
    this.loginPage = false
  }

  loginTab() {
    this.loginPage = true
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      this.loginError = "Đã có lỗi xảy ra. Vui lòng thử lại."
      return

    }

    this.loginError = ""
    return
  }
}
