import { inject, Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../core/service/auth.service";
import { map } from "rxjs/operators";

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map((user) => {
      if (user && user.role == "admin") {
        return true;
      } else {
        router.navigate(['/gift-list'])
        return false;
      }
    })
  );
};
