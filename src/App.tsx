import React, {useContext} from 'react';
import './App.css';
import MyAppBar from "./appBar/AppBar";
import {Route, Switch} from "react-router";
import Routes from "./routes/Routes";
import NotFound from "./pages/NotFound";
import {RouteInformation} from "./dto/RouteInformation";
import {RouteContext, RouteContextInfo} from "./routes/RoutesContext";
import RouteContextProvider from "./routes/RoutesContext";


export default function App() {
    return (
        <RouteContextProvider>
            <div className="App">
                <MyAppBar />
                <MySwitch />
            </div>
        </RouteContextProvider>
    );
}

const MySwitch = () =>  {

    const { id, updateId, switchInfo } = useContext(RouteContext) as RouteContextInfo;
    console.log("DPC: " + id);

    updateId(BigInt(10));
    console.log("DPC: " + id);
    return (
        <Switch>
            {
                Routes.map((route: RouteInformation) => (
                    <Route exact path={route.path} key={route.path} render={() => {
                        switchInfo(route.appBarInfo);
                        console.log("AAAAA");
                        return <route.component/>
                    }}/>
                ))
            }
            <Route component={NotFound} />
        </Switch>
    )

};
