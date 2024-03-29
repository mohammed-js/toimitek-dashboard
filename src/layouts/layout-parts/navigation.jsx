// CUSTOM ICON COMPONENT
import duotone from "icons/duotone";

// type ChildItem = { name: string; path: string };

// type ChildItemWithChildren = {
//   name: string;
//   path: string;
//   children?: ChildItemWithChildren[];
// };
export const navigationsEn = [
  // {
  //   type: "label",
  //   label: "Dashboard",
  // },
  {
    name: "Catalog",
    icon: duotone.UserList,
    children: [
      {
        name: "Units",
        path: "/units",
      },
      {
        name: "Categories",
        path: "/categories",
      },
      {
        name: "Products",
        path: "/products",
      },
      {
        name: "Services",
        path: "/services",
      },
      {
        name: "Items",
        path: "/items",
      },
    ],
  },
  // {
  //   type: "label",
  //   label: "Management",
  // },
  // {
  //   name: "Profile",
  //   icon: duotone.UserProfile,
  //   path: "/dashboard/profile",
  // },
  // {
  //   name: "Account",
  //   icon: duotone.Accounts,
  //   path: "/dashboard/account",
  // },
  // {
  //   name: "Invoice",
  //   icon: duotone.Invoice,
  //   children: [
  //     {
  //       name: "Invoice List",
  //       path: "/dashboard/invoice-list",
  //     },
  //     {
  //       name: "Invoice Details",
  //       path: "/dashboard/invoice-details",
  //     },
  //     {
  //       name: "Create Invoice",
  //       path: "/dashboard/create-invoice",
  //     },
  //   ],
  // },
  // {
  //   name: "Data Table",
  //   icon: duotone.DataTable,
  //   children: [
  //     {
  //       name: "Data Table 1",
  //       path: "/dashboard/data-table-1",
  //     },
  //   ],
  // },
];
export const navigationsAr = [
  // {
  //   type: "label",
  //   label: "Dashboard",
  // },
  {
    name: "الكاتالوج",
    icon: duotone.UserList,
    children: [
      {
        name: "الوحدات",
        path: "/units",
      },
      {
        name: "الفئات",
        path: "/categories",
      },
      {
        name: "المنتجات",
        path: "/products",
      },
      {
        name: "الخدمات",
        path: "/services",
      },
      {
        name: "Items",
        path: "/items",
      },
    ],
  },
  // {
  //   type: "label",
  //   label: "Management",
  // },
  // {
  //   name: "Profile",
  //   icon: duotone.UserProfile,
  //   path: "/dashboard/profile",
  // },
  // {
  //   name: "Account",
  //   icon: duotone.Accounts,
  //   path: "/dashboard/account",
  // },
  // {
  //   name: "Invoice",
  //   icon: duotone.Invoice,
  //   children: [
  //     {
  //       name: "Invoice List",
  //       path: "/dashboard/invoice-list",
  //     },
  //     {
  //       name: "Invoice Details",
  //       path: "/dashboard/invoice-details",
  //     },
  //     {
  //       name: "Create Invoice",
  //       path: "/dashboard/create-invoice",
  //     },
  //   ],
  // },
  // {
  //   name: "Data Table",
  //   icon: duotone.DataTable,
  //   children: [
  //     {
  //       name: "Data Table 1",
  //       path: "/dashboard/data-table-1",
  //     },
  //   ],
  // },
];
