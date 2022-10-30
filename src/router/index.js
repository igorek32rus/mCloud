import AuthPage from "../pages/AuthPage/AuthPage"
import MainPage from "../pages/MainPage/MainPage"
import SharePage from "../pages/SharePage/SharePage"

export const privateRoutes = [
    { path: '/share/:fileID', component: SharePage, exact: true },
    { path: '/files/:category/:parent', component: MainPage, exact: true },
    { path: '/files/:category/:parent/:fileID', component: MainPage, exact: true }
]

export const publicRoutes = [
    { path: '/share/:fileID', component: SharePage, exact: true },
    { path: '*', component: AuthPage, exact: true }
]