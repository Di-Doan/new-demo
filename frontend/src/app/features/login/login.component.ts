import { TokenHelper } from "../../shared/helper/token.helper";
import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  ValidationErrors,
} from "@angular/forms";
import { AuthService } from "../../core/service/auth.service";
import { Subject, takeUntil } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { UserGiftService } from "../../core/service/userGift.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbAlertModule],
  providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
  visible = false;
  loginPage = true;

  loginForm!: FormGroup;
  loginError = "";
  showLoginAlert = false;
  loginAlertMessage: string = "";

  forgetPasswordForm = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  forgetPasswordError = "";
  showForgotAlert = false;
  forgotAlertMessage: string = "";

  resetPasswordForm!: FormGroup;

  userOtp!: number;

  destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private TokenHelper: TokenHelper,
    private userGiftService: UserGiftService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initResetPasswordForm();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      userEmail: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  initResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group(
      {
        userEmail: [
          window.localStorage.getItem("userEmail"),
          Validators.required,
        ],
        otp: [null, Validators.required],
        password: ["", [Validators.required, Validators.pattern("^.{6,32}$")]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: this.passwordsMatch("password", "confirmPassword"),
      }
    );
  }

  initForgetPasswordForm() {
    this.forgetPasswordForm = new FormControl("", [
      Validators.required,
      Validators.email,
    ]);
  }

  passwordsMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (
        passwordControl?.value !== confirmPasswordControl?.value &&
        passwordControl?.value !== ""
      ) {
        confirmPasswordControl?.setErrors({ passwordsMismatch: true });
        this.forgetPasswordError = "Mật khẩu không khớp. Vui lòng thử lại.";
        return { passwordsMatch: "Mật khẩu không khớp. Vui lòng thử lại." };
      } else {
        confirmPasswordControl?.setErrors(null);
        this.forgetPasswordError = "";
      }

      return null;
    };
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.initForm();
    this.loginTab();
  }

  forgetPasswordTab() {
    this.loginPage = false;
    this.initForm();
  }

  loginTab() {
    this.loginPage = true;
    this.initResetPasswordForm();
    this.initForgetPasswordForm();
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginError = "Đã có lỗi xảy ra. Vui lòng thử lại.";
      return;
    }
    const userEmail = String(this.loginForm.get("userEmail")?.value);
    const password = String(this.loginForm.get("password")?.value);
    this.authService
      .login(userEmail, password)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.loginAlertMessage = "Đăng nhập thành công!";
          this.showLoginAlert = true;
          this.loginError = "";
          this.authService.setAuthState(this.TokenHelper.fetchUserDataCookie());
          setTimeout(() => {
            this.close();
            this.showLoginAlert = false;
          }, 700);
        },
        error: (error: HttpErrorResponse) => {
          if (error.error && error.error.errMessage) {
            this.loginError = error.error.errMessage;
          } else {
            this.loginError = "Đã có lỗi xảy ra";
          }
        },
      });
    return;
  }

  submitForgetPassword() {
    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.markAllAsTouched();
      this.forgetPasswordError = "Đã có lỗi xảy ra. Vui lòng thử lại.";
      return;
    }

    window.localStorage.setItem(
      "userEmail",
      String(this.forgetPasswordForm.value)
    );

    this.authService
      .forgetPassword(String(this.forgetPasswordForm.value))
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.forgotAlertMessage = "Đã gửi mail xác nhận!";
          this.showForgotAlert = true;
          setTimeout(() => (this.showForgotAlert = false), 3000);
          this.forgetPasswordError = "";
          this.resetPasswordForm.get("userEmail")?.setValue(res.data.userEmail);
          // setTimeout(() => this.close(), 3000);
        },
        error: (error: HttpErrorResponse) => {
          if (error.error && error.error.errMessage) {
            this.forgetPasswordError = error.error.errMessage;
          } else {
            this.forgetPasswordError = "Đã có lỗi xảy ra";
          }
        },
      });
  }

  submitOtp() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      if (
        this.resetPasswordForm.get("password")?.errors ||
        this.resetPasswordForm.get("otp")?.errors ||
        this.resetPasswordForm.get("confirmPassword")?.errors
      ) {
        this.forgetPasswordError = "Vui lòng điền đầy đủ thông tin";
        return
      }
      if (this.resetPasswordForm.get("password")?.errors?.["pattern"]) {
        this.forgetPasswordError = "Mật khẩu phải từ 6 - 32 ký tự";
      }
      this.forgetPasswordError = "Đã có lỗi xảy ra. Vui lòng thử lại";
      return;
    }
    const userEmail = String(this.resetPasswordForm.get("userEmail")?.value);
    const otp = Number(this.resetPasswordForm.get("otp")?.value);
    const password = String(this.resetPasswordForm.get("password")?.value);

    this.authService
      .resetPassword(userEmail, otp, password)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.forgotAlertMessage = "Đổi mật khẩu thành công!";
          window.localStorage.removeItem("userEmail");
          this.showForgotAlert = true;
          setTimeout(() => (this.showForgotAlert = false), 2000);
          this.forgetPasswordError = "";
          setTimeout(() => this.loginTab(), 2000);
        },
        error: (error: HttpErrorResponse) => {
          if (error.error && error.error.errMessage) {
            this.forgetPasswordError = error.error.errMessage;
          } else {
            this.forgetPasswordError = "Đã có lỗi xảy ra";
          }
        },
      });
  }

  fetchUserGiftList() {
    this.userGiftService
      .getUserGiftList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.userGiftService.updateUserGiftList(
            res.data.userGiftList.giftList
          );
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: "error",
            summary: "Lỗi",
            detail: error.error.errMessage,
            life: 3000,
          });
        },
      });
  }
}
