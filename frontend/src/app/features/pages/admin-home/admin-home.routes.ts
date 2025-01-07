import { Routes } from "@angular/router";
import {superAdminGuard} from "../../../shared/guard/superAdmin.guard"
import { adminGuard } from "../../../shared/guard/admin.guard";

export const adminRoutes: Routes = [
  {
    path: "gift-list",
    loadComponent: () =>
      import("../../admin/admin-gift/admin-gift.component").then(
        (m) => m.AdminGiftComponent
      ),
      canActivate: [adminGuard]
  },
  {
    path: "user-list",
    loadComponent: () =>
      import("../../admin/admin-user/admin-user.component").then(
        (m) => m.AdminUserComponent
      ),
      canActivate: [superAdminGuard]
  },
  {
    path: "contact-list",
    loadComponent: () =>
      import("../../admin/admin-contact/admin-contact.component").then(
        (m) => m.AdminContactComponent
      ),
      canActivate: [adminGuard]
  },
  {
    path: "subscription-list",
    loadComponent: () =>
      import("../../admin/admin-subscription/admin-subscription.component").then(
        (m) => m.AdminSubscriptionComponent
      ),
      canActivate: [adminGuard]
  },
];
