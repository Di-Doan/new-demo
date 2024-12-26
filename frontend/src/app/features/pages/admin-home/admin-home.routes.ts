import { Routes } from "@angular/router";

export const adminRoutes: Routes = [
  {
    path: "gift-list",
    loadComponent: () =>
      import("../../admin/admin-gift/admin-gift.component").then(
        (m) => m.AdminGiftComponent
      ),
  },
  {
    path: "user-list",
    loadComponent: () =>
      import("../../admin/admin-user/admin-user.component").then(
        (m) => m.AdminUserComponent
      ),
  },
  {
    path: "contact-list",
    loadComponent: () =>
      import("../../admin/admin-contact/admin-contact.component").then(
        (m) => m.AdminContactComponent
      ),
  },
  {
    path: "subscription-list",
    loadComponent: () =>
      import("../../admin/admin-subscription/admin-subscription.component").then(
        (m) => m.AdminSubscriptionComponent
      )
  },
];
