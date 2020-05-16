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
import UserProfile from "views/UserProfile/UserProfile.js";
import InventarioTableList from "views/Inventario/InventarioTableList.js";
import TableListEmpleados from "views/TableList/TableListEmpleados.js";
import Typography from "views/Typography/Typography.js";
import Pedidos from "views/Pedidos/Pedidos.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import TableListPedidos from "views/TablaPedidos/TableListPedidos.js";
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
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
    component: InventarioTableList,
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
  }
  /*{
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
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
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }*/
];

export default dashboardRoutes;
