import { TokenHelper } from "./../../shared/helper/token.helper";
import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { LoginComponent } from "../../features/login/login.component";
import { AuthService } from "../service/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [CarouselModule, CommonModule, LoginComponent, RouterModule],
})
export class HeaderComponent implements OnInit, OnChanges {
  @ViewChild("loginModal") modal?: LoginComponent;
  slides: any[] = [
    "../../../assets/img/banner1.png",
    "../../../assets/img/banner2.png",
    "../../../assets/img/banner3.png",
    "../../../assets/img/banner4.png",
  ];
  user = { name: "", point: "", role: "" };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
    this.user = { name: "", point: "", role: "" };
    this.authService.logout().subscribe({
      next: (res) => {
        this.router.navigate(["/gift-list"]);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
