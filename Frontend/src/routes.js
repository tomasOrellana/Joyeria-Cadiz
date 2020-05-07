/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Icons from "views/Icons/Icons.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableListInventario from "views/TableList/TableListInventario.js";
import TableListEmpleados from "views/TableList/TableListEmpleados.js";
import TableListPedidos from "views/TableList/TableListPedidos.js";
import Typography from "views/Typography/Typography.js";
import Pedidos from "views/UserProfile/Pedidos.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
//import Login from "views/Init/Init.js";
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [/*
  {
    path: "/inicio",
    name: "Login",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Login,
    layout: "/admin"
  },*/
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/inventario",
    name: "Inventario",
    rtlName: "لوحة القيادة",
    icon: "content_paste",
    component: TableListInventario,
    layout: "/admin"
  },
  {
    path: "/empleados",
    name: "Empleados",
    rtlName: "لوحة القيادة",
    icon: "person_pin",
    component: TableListEmpleados,
    layout: "/admin"
  },
  {
    path: "/tiendas",
    name: "Tiendas",
    rtlName: "لوحة القيادة",
    icon: "store",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/ventas",
    name: "Ventas",
    rtlName: "لوحة القيادة",
    icon: "shop",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/taller",
    name: "Taller",
    rtlName: "لوحة القيادة",
    icon: "palette",
    component: Pedidos,
    layout: "/admin"
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    rtlName: "لوحة القيادة",
    icon: "list_alt",
    component: TableListPedidos,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
