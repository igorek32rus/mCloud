// import AuthPage from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import RegistrationPage from "../pages/RegistrationPage";

export const privateRoutes = [
    { path: '/', component: MainPage, exact: true }
]

export const publicRoutes = [
    { path: '/login', component: LoginPage, exact: true },
    { path: '/registration', component: RegistrationPage, exact: true }
]