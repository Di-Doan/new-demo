import { Routes } from "@angular/router";
import { adminGuard } from "./shared/guard/admin.guard";
import { userRoutes } from "./features/pages/user-home/user-home.routes";
import { adminRoutes } from "./features/pages/admin-home/admin-home.routes";

export const routes: Routes = [
  {
    path: "admin",
    loadComponent: () =>
      import("./features/pages/admin-home/admin-home.component").then(
        (m) => m.AdminHomeComponent
      ),
    children: [
      ...adminRoutes,
      { path: "", redirectTo: "/admin/gift-list", pathMatch: "full" },
    ],
    canActivate: [adminGuard],
  },
  {
    path: "",
    loadComponent: () =>
      import("./features/pages/user-home/user-home.component").then(
        (m) => m.UserHomeComponent
      ),
    children: [
      // Spread the userRoutes here as child routes
      ...userRoutes, // This includes all routes from user.routes.ts

      { path: "", redirectTo: "gift-list", pathMatch: "full" }, // Redirect empty path to /user/gift-list
    ],
  },
  {
    path: "**",
    loadComponent: () =>
      import("./features/not-found/not-found.component").then(
        (m) => m.NotFoundComponent
      ),
  },
];
