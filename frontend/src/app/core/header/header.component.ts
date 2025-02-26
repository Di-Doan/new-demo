import { CommonModule } from "@angular/common";
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { LoginComponent } from "../../features/login/login.component";
import { AuthService } from "../service/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, RouterModule } from "@angular/router";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { UserModel } from "../../shared/models";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [
    CarouselModule,
    CommonModule,
    LoginComponent,
    RouterModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild("loginModal") modal?: LoginComponent;
  slides: any[] = [
    "../../../assets/img/banner1.png",
    "../../../assets/img/banner2.png",
    "../../../assets/img/banner3.png",
    "../../../assets/img/banner4.png",
  ];
  user: UserModel = new UserModel();

  destroyed$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.updateUserInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateUserInfo();
  }

  updateUserInfo() {
    this.authService.user$.subscribe((userData) => {
      if (userData) {
        this.user = userData;
      }
    });
  }

  openLoginModal() {
    this.modal?.open();
  }

  logout() {
    this.user = new UserModel();
    this.authService.logout().pipe(takeUntil(this.destroyed$)).subscribe({
      next: (res) => {
        this.router.navigate(["/"]);
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
