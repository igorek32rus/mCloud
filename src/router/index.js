import AuthPage from "../pages/AuthPage"
import MainPage from "../pages/MainPage"
import SharePage from "../pages/SharePage"

export const privateRoutes = [
    { path: '/share/:fileID', component: SharePage, exact: true },
    { path: '/files/:category/:parent', component: MainPage, exact: true }
]

export const publicRoutes = [
    { path: '/share/:fileID', component: SharePage, exact: true },
    { path: '*', component: AuthPage, exact: true }
]