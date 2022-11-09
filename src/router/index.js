import AuthPage from "../pages/AuthPage/AuthPage"
import MainPage from "../pages/MainPage/MainPage"
import SharePage from "../pages/SharePage/SharePage"
import SettingsPage from "../pages/SettingsPage/SettingsPage"

export const privateRoutes = [
    { path: '/share/:fileID', component: SharePage, exact: true },
    { path: '/files/:category/:parent', component: MainPage, exact: true },
    { path: '/files/:category/:parent/:fileID', component: MainPage, exact: true },
    { path: '/settings', component: SettingsPage, exact: true }
]

export const publicRoutes = [
    { path: '/share/:fileID', component: SharePage, exact: true },
    { path: '*', component: AuthPage, exact: true }
]