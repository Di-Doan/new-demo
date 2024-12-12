import { Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { AuthService } from "../../../core/service/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-navbar",
  standalone: true,
  templateUrl: "./admin-navbar.component.html",
  styleUrls: ["./admin-navbar.component.scss"],
  imports: [CommonModule],
})
export class AdminNavbarComponent implements OnInit {
  admin = { name: "" };

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((value) => {
      this.admin.name = value.name;
    });
  }

  toggleSidebarIconOnly() {
    if (document.body.classList.contains("sidebar-icon-only")) {
      this.renderer.removeClass(document.body, "sidebar-icon-only");
    } else {
      this.renderer.addClass(document.body, "sidebar-icon-only");
    }
  }

  toggleSidebarOffcanvas() {
    if (document.getElementById("sidebar")?.classList.contains("active")) {
      this.renderer.removeClass(document.getElementById("sidebar"), "active");
    } else {
      this.renderer.addClass(document.getElementById("sidebar"), "active");
    }
  }

  toggleProfileDropdown() {
    if (
      document.getElementById("profileDropdown")?.classList.contains("show")
    ) {
      this.renderer.removeClass(
        document.getElementById("profileDropdown"),
        "show"
      );
      this.renderer.removeClass(
        document.getElementById("profileDropdownSignout"),
        "show"
      );
    } else {
      this.renderer.addClass(
        document.getElementById("profileDropdown"),
        "show"
      );
      this.renderer.addClass(
        document.getElementById("profileDropdownSignout"),
        "show"
      );
    }
  }

  logout() {
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
