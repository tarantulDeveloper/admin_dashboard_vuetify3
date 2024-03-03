import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import RegisterAdminOrManager from "@/pages/RegisterAdminOrManager.vue";
import TransferToAnotherAccount from "@/pages/TransferToAnotherAccount.vue";
import TransfersHistory from "@/pages/TransfersHistory.vue";
import ProductAdd from "@/pages/ProductAdd.vue";
import ProductsListPage from "@/pages/ProductsListPage.vue";
import ProductUpdate from "@/pages/ProductUpdate.vue";
import PurchasesHistory from "@/pages/PurchasesHistory.vue";
import DealerProfileInfoChange from "@/pages/DealerProfileInfoChange.vue";
import ChangeProfileInfoRequestTable from "@/components/ChangeProfileInfoRequestTable.vue";
import RegisterDealerByManagerPage from "@/pages/RegisterDealerByManagerPage.vue";
import AdminAndManagerProfileInfoChange from "@/pages/AdminAndManagerProfileInfoChange.vue";
import PasswordChange from "@/pages/PasswordChange.vue";

//Lazy loaded
const UsersListPage = () => import("./pages/UsersListPage.vue");
const UserUpdatePage = () => import("./pages/UserUpdate.vue");
const ClientUpdatePage = () => import("./pages/ClientUpdate.vue");
const RegisterRequestsTable = () =>
  import("./components/RegistrationRequestsTable.vue");
const CurrencyPage = () => import("./components/CurrencyTable.vue");
const UserProfilePage = () => import("./pages/UserProfile.vue");
const TransactionPage = () =>
  import("./components/TransactionRequestTable.vue");
const IncomePage = () => import("./pages/IncomePage.vue");
const SetSoftcoinRatePage = () => import("./pages/SetSoftcoinRatePage.vue");

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/login", component: Login },
  { path: "/signup", component: Register },
  { path: "/users", component: UsersListPage },
  { path: "/users/:id", component: UserUpdatePage, name: "user_update" },
  { path: "/clients/:id", component: ClientUpdatePage, name: "client_update" },
  {
    path: "/register-requests",
    component: RegisterRequestsTable,
    name: "register_requests",
  },
  { path: "/register-admin-manager", component: RegisterAdminOrManager },
  { path: "/currency", component: CurrencyPage },
  { path: "/profile", component: UserProfilePage },
  { path: "/transfer-requests", component: TransactionPage },
  { path: "/transfer", component: TransferToAnotherAccount },
  { path: "/transfers-history", component: TransfersHistory },
  { path: "/add-product", component: ProductAdd },
  { path: "/products", component: ProductsListPage },
  { path: "/products/:id", component: ProductUpdate, name: "product_update" },
  { path: "/system-income", component: IncomePage },
  { path: "/purchases-history", component: PurchasesHistory },
  { path: "/change-profile", component: DealerProfileInfoChange, name: "change_profile_info" },
  { path: "/profile-changing-requests", component: ChangeProfileInfoRequestTable},
  {path: "/set_softcoin_rate", component: SetSoftcoinRatePage},
  {path: "/register_dealer_by_manager", component: RegisterDealerByManagerPage},
  {path: "/change-system-user-profile-info", component: AdminAndManagerProfileInfoChange},
  {path: "/password", component: PasswordChange}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/signup", "/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
