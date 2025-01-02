import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../core/header/header.component";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, RouterOutlet } from "@angular/router";
import { FooterComponent } from "../../../core/footer/footer.component";
import { SpinnerService } from "../../../core/service/spinner.service";
import { CommonModule } from "@angular/common";
import { SpinnerComponent } from "../../../shared/helper/spinner/spinner.component";

@Component({
  selector: "app-user-home",
  standalone: true,
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.scss"],
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    CommonModule,
    SpinnerComponent,
  ],
})
export class UserHomeComponent implements OnInit {
  loading$ = this.spinnerService.loading$;

  constructor(public spinnerService: SpinnerService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.spinnerService.hide();
      }
    });
  }

  ngOnInit() {}
}
