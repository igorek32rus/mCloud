import AuthPage from "../pages/AuthPage"
import MainPage from "../pages/MainPage"

export const privateRoutes = [
    { path: '/files', component: MainPage, exact: true }
]

export const publicRoutes = [
    { path: '/auth', component: AuthPage, exact: true }
]