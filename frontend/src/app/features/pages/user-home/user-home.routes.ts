import { Routes } from "@angular/router";

export const userRoutes: Routes = [
  {
    path: "contact",
    loadComponent: () =>
      import("../../contact/contact.component").then((m) => m.ContactComponent),
  },
  {
    path: "policy",
    loadComponent: () =>
      import("../../policy/policy.component").then((m) => m.PolicyComponent),
  },
  {
    path: "gift-list",
    loadComponent: () =>
      import("../../gift-list/gift-list.component").then(
        (m) => m.GiftListComponent
      ),
  },
  {
    path: "user",
    loadComponent: () =>
      import("../../user-gift/user-gift.component").then(
        (m) => m.UserGiftComponent
      ),
  },
  { path: "", redirectTo: "/gift-list", pathMatch: "full" }
];
