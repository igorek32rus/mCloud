import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthContext } from './Context'
import { privateRoutes, publicRoutes } from "./router";

function AppRouter() {
    const {isAuth, userData} = useContext(AuthContext)

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
                <Redirect to={redirectUrl} />
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