import { Routes } from "@angular/router";
import { adminGuard } from "./shared/guard/admin.guard";
import { userRoutes } from "./features/pages/user-home/user-home.routes";
import { adminRoutes } from "./features/pages/admin-home/admin-home.routes";
import { loadingMatch } from "./shared/guard/loading.guard";

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
    canMatch: [loadingMatch]
  },
  {
    path: "",
    loadComponent: () =>
      import("./features/pages/user-home/user-home.component").then(
        (m) => m.UserHomeComponent
      ),
    children: [
      ...userRoutes, 

      { path: "", redirectTo: "gift-list", pathMatch: "full" }, 
    ],
    canMatch: [loadingMatch]
  },
  {
    path: "**",
    loadComponent: () =>
      import("./features/not-found/not-found.component").then(
        (m) => m.NotFoundComponent
      ),
  },
];
