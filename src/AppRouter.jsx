import React from "react"
import { Redirect, Route, Switch } from "react-router"
import { privateRoutes, publicRoutes } from "./router"
import { useSelector } from 'react-redux'

function AppRouter() {
    const {isAuth, userData} = useSelector(state => state.auth)

    const redirectUrl = isAuth ? "/files/main/" + userData.rootId : ''

    return (
        isAuth ? 
            <Switch>
                { privateRoutes.map((route) => {
                    return (<Route 
                        path={route.path} 
                        component={route.component} 
                        exact={route.exact} 
                        key={route.component.name} />
                    )
                }) }
                <Redirect from="*" to={redirectUrl} />
            </Switch>
        :
            <Switch>
                { publicRoutes.map((route) => {
                    return (<Route 
                        path={route.path} 
                        component={route.component} 
                        exact={route.exact} 
                        key={route.component.name} />
                    )
                }) }
                {/* <Redirect to="/auth" /> */}
            </Switch>
    )
}

export default AppRouter