import { Routes } from "@angular/router";

export const adminRoutes: Routes = [
  {
    path: "gift-list",
    loadComponent: ()=> import("../../admin/admin-gift/admin-gift.component").then((m)=> m.AdminGiftComponent),
  },
  {
    path: "user-list",
    loadComponent: ()=> import("../../admin/admin-user/admin-user.component").then((m)=> m.AdminUserComponent)
  }
];
